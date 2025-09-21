import { ApplicationStatus, PrismaClient } from "@prisma/client";
import { discordBot } from "./discord-bot";
import { emailService } from "./email-service";

const prisma = new PrismaClient();

interface ApprovalData {
	applicationId: string;
	adminId: string;
	discordUserId?: string;
}

export async function approveMembershipDual(data: ApprovalData) {
	const { applicationId, adminId, discordUserId } = data;

	try {
		const application = await prisma.membershipApplication.findUnique({
			where: { id: applicationId },
		});

		if (!application || !application.email) {
			throw new Error("Aplicação ou email não encontrado");
		}

		const guildId = process.env.DISCORD_GUILD_ID!;
		const inviteUrl = await discordBot.createUniqueInvite(guildId);

		await prisma.membershipApplication.update({
			where: { id: applicationId },
			data: { status: ApplicationStatus.CLEAR },
		});

		const memberData = {
			youtubeId: application.youtubeId,
			applicationNumber: application.applicationNumber,
			inviteUrl,
			state: application.state,
			age: application.age,
		};

		const emailSent = await emailService.sendApprovalEmail(
			application.email,
			memberData
		);

		let discordSent = false;
		if (discordUserId) {
			const discordMessage = `
🚩 **BEM-VINDE AO PARTIDO URUBISTA!** 🚩

Sua inscrição foi aprovada! 

**🎮 CONVITE:**
${inviteUrl}

**📋 DADOS:**
• #${application.applicationNumber}
• ${application.youtubeId}
• ${application.state}

Você também recebeu por email! 📧
**🔴 VIVA O URUBU! ⚫**
      `;

			discordSent = await discordBot.sendDirectMessage(
				discordUserId,
				discordMessage
			);

			//todo: trocar o canal de notificação
			// if (!discordSent) {
			// 	const channelId = process.env.DISCORD_APPROVAL_CHANNEL_ID;
			// 	if (channelId) {
			// 		const publicMsg = `🎉 <@${discordUserId}> (${application.youtubeId}) aprovado! Convite: ${inviteUrl}`;
			// 		discordSent = await discordBot.sendChannelMessage(
			// 			channelId,
			// 			publicMsg
			// 		);
			// 	}
			// }
		}

		return {
			success: true,
			inviteUrl,
			emailSent,
			discordSent,
			applicationNumber: application.applicationNumber,
			email: application.email,
		};
	} catch (error) {
		console.error("❌ Erro na aprovação:", error);
		throw error;
	}
}
