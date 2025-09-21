import { ChannelType, Client, GatewayIntentBits, TextChannel } from 'discord.js';

class DiscordBot {
  private client: Client;
  private isReady = false;
  private isInitializing = false;

  constructor() {
    this.client = new Client({ 
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages
      ] 
    });

    this.setupEventListeners();
    this.autoInitialize();
  }

  private setupEventListeners() {
    this.client.once('ready', () => {
      console.log(`🤖 Bot do PU logado como ${this.client.user?.tag}`);
      this.isReady = true;
    });

    this.client.on('error', (error) => {
      console.error('❌ Erro no bot do Discord:', error);
    });
  }

  private async autoInitialize() {
    if (this.isInitializing) return;
    
    this.isInitializing = true;
    
    try {
      if (!process.env.DISCORD_BOT_TOKEN) {
        throw new Error('DISCORD_BOT_TOKEN não encontrado no .env');
      }

      await this.client.login(process.env.DISCORD_BOT_TOKEN);
      console.log('✅ Discord bot inicializado automaticamente');
    } catch (error) {
      console.error('❌ Erro na inicialização automática do bot:', error);
      this.isInitializing = false;
      setTimeout(() => this.autoInitialize(), 5000);
    }
  }

  private async waitForConnection(maxWaitTime = 30000): Promise<void> {
    const checkInterval = 1000;
    let waitTime = 0;

    while (!this.isReady && waitTime < maxWaitTime) {
      await new Promise(resolve => setTimeout(resolve, checkInterval));
      waitTime += checkInterval;
    }

    if (!this.isReady) {
      throw new Error('Bot não conseguiu conectar dentro do tempo limite');
    }
  }

  async createUniqueInvite(guildId: string, channelId?: string): Promise<string> {
    if (!this.isReady) {
      console.log('🔄 Aguardando bot conectar...');
      await this.waitForConnection();
    }

    try {
      const guild = await this.client.guilds.fetch(guildId);
      
      let channel;
      if (channelId) {
        channel = await guild.channels.fetch(channelId);
      } else {
        channel = guild.channels.cache.find(
          ch => ch.type === ChannelType.GuildText && ch.name.includes('geral')
        ) || guild.channels.cache.find(
          ch => ch.type === ChannelType.GuildText
        );
      }

      if (!channel || channel.type !== ChannelType.GuildText) {
        throw new Error('Canal de texto não encontrado');
      }

      const invite = await (channel as TextChannel).createInvite({
        maxUses: 1,
        maxAge: 7 * 24 * 60 * 60,
        unique: true,
        reason: 'Convite aprovação PU'
      });

      return invite.url;
    } catch (error) {
      console.error('Erro ao criar convite:', error);
      throw new Error('Falha ao criar convite do Discord');
    }
  }

  async sendDirectMessage(userId: string, message: string): Promise<boolean> {
    if (!this.isReady) {
      console.log('🔄 Aguardando bot conectar...');
      await this.waitForConnection();
    }

    try {
      const user = await this.client.users.fetch(userId);
      await user.send(message);
      return true;
    } catch (error) {
      console.error(`Erro ao enviar DM para ${userId}:`, error);
      return false;
    }
  }

  async sendChannelMessage(channelId: string, message: string): Promise<boolean> {
    if (!this.isReady) {
      console.log('🔄 Aguardando bot conectar...');
      await this.waitForConnection();
    }

    try {
      const channel = await this.client.channels.fetch(channelId);
      if (channel && channel.type === ChannelType.GuildText) {
        await (channel as TextChannel).send(message);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Erro ao enviar mensagem no canal ${channelId}:`, error);
      return false;
    }
  }

  get connected(): boolean {
    return this.isReady;
  }

  async reconnect(): Promise<void> {
    if (this.client.isReady()) {
      this.client.destroy();
    }
    this.isReady = false;
    this.isInitializing = false;
    await this.autoInitialize();
  }
}

export const discordBot = new DiscordBot();