/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";

class EmailService {
	private transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST || "smtp.gmail.com",
			port: parseInt(process.env.SMTP_PORT || "587"),
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});
	}

	async sendApprovalEmail(to: string, memberData: any): Promise<boolean> {
		try {
			const { youtubeId, applicationNumber, inviteUrl, state, age } =
				memberData;

			const htmlContent = `
      <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bem-vinde ao Partido Urubista!</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; }
            @media screen and (max-width: 600px) {
              .container { width: 100% !important; border-radius: 0 !important; }
              .content, .header, .footer { padding-left: 15px !important; padding-right: 15px !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #000; font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 20px 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="650" class="container" style="max-width: 650px; border-collapse: collapse; background-color: #1a1a1a; border-radius: 8px; border: 1px solid #cc0000;">
                  <!-- Header -->
                  <tr>
                    <td align="center" style="background-color: #cc0000; padding: 25px 20px; border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; font-size: 28px; color: #fff;">Bem-vinde ao Partido Urubista!</h1>
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="padding: 30px 25px; color: #fff;" class="content">
                      <h2 style="color: #cc0000; margin-top: 0; margin-bottom: 20px;">Parabéns, Camarada ${youtubeId}!</h2>
                      <p style="margin: 1em 0;">Sua inscrição foi <strong style="color: #ff6666;">APROVADA</strong> com sucesso. Estamos honrados em tê-lo como membro oficial.</p>
                      
                      <!-- Discord Invite -->
                      <div style="background-color: #2c2c2c; padding: 20px; border-radius: 5px; margin: 25px 0; text-align: center;">
                        <h3 style="margin-top: 0; margin-bottom: 15px; color: #fff; font-size: 16px;">SEU CONVITE PARA O DISCORD</h3>
                        <a href="${inviteUrl}" style="display: inline-block; background-color: #5865F2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">ENTRAR NO SERVIDOR</a>
                        <p style="margin-top: 15px; font-size: 12px; color: #aaa;">${inviteUrl}</p>
                      </div>

                      <!-- Member Data -->
                      <div style="padding: 10px 0; margin: 25px 0;">
                        <h3 style="margin-top: 0; margin-bottom: 15px; color: #fff; font-size: 16px; border-bottom: 1px solid #444; padding-bottom: 8px;">DADOS DO MEMBRO</h3>
                        <ul style="padding-left: 0; margin: 0; list-style-type: none; color: #ccc;">
                          <li style="margin: 10px 0;"><strong style="color: #ff6666; display: inline-block; width: 150px;">Nº de registro:</strong> #${applicationNumber}</li>
                          <li style="margin: 10px 0;"><strong style="color: #ff6666; display: inline-block; width: 150px;">ID YouTube:</strong> ${youtubeId}</li>
                          <li style="margin: 10px 0;"><strong style="color: #ff6666; display: inline-block; width: 150px;">Estado:</strong> ${state}</li>
                          <li style="margin: 10px 0;"><strong style="color: #ff6666; display: inline-block; width: 150px;">Idade:</strong> ${age} anos</li>
                        </ul>
                      </div>

                      <div style="font-size: 18px; color: #ff3333; margin: 35px 0; text-align: center;">
                        Viva o Escaralhamento e Viva La Revolucion!
                      </div>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td align="center" style="background-color: #111; padding: 20px; font-size: 12px; color: #888; border-radius: 0 0 8px 8px;" class="footer">
                      <p style="margin: 0 0 5px 0;">Partido Urubista - Comunicação Oficial</p>
                      <p style="margin: 0;">Este é um e-mail automático. Por favor, não responda.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

			await this.transporter.sendMail({
				from: `"Partido Urubista" <${process.env.SMTP_USER}>`,
				to,
				subject: "🚩 BEM-VINDE AO PARTIDO URUBISTA! - Aprovação Confirmada",
				html: htmlContent,
			});

			console.log("✅ Email enviado para:", to);
			return true;
		} catch (error) {
			console.error("❌ Erro no email:", error);
			return false;
		}
	}
}

export const emailService = new EmailService();
