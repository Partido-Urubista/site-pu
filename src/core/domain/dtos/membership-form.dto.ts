import z from "zod";

/**
 * @file Membership Form DTO
 * @description Defines the schema for the membership form using Zod.
 */

export interface MembershipFormDTO {
	youtubeId: string;
	discordId?: string;
	age: string;
	state: string;
	youtubeChannels: string;
	onlinePresence:
		| "Pouco ativo"
		| "Moderadamente online"
		| "Cronicamente online";
	escaralhamentoLevel: "Iniciante" | "Escaralhador médio" | "Doutrinador";
	politicalIdeology: string;
	neurodivergence?: string;
	currentSituation:
		| "Ensino Médio"
		| "Faculdade"
		| "Técnico"
		| "Vestibular"
		| "Trabalhando"
		| "Desempregado";
	howDidYouHear: string;
	motivation: string;
}

export type MembershipType = z.infer<typeof MembershipFormSchema>;

export const MembershipFormSchema = z.object({
	youtubeId: z.string().min(1, { message: "Entrada obrigatória!" }),
	discordId: z.string().optional(),
	age: z
		.string()
		.min(1, { message: "Entrada obrigatória!" })
		.max(3, { message: "Entrada inválida!" }),
	state: z.string().min(2, { message: "Entrada obrigatória!" }),
	youtubeChannels: z.string().min(1, { message: "Entrada obrigatória!" }),
	onlinePresence: z.enum(
		["Pouco ativo", "Moderadamente online", "Cronicamente online"],
		{ message: "Selecione uma opção válida!" }
	),
	escaralhamentoLevel: z.enum(
		["Iniciante", "Escaralhador médio", "Doutrinador"],
		{
			message: "Selecione uma opção válida!",
		}
	),
	politicalIdeology: z.string().min(1, { message: "Entrada obrigatória!" }),
	neurodivergence: z.string().optional(),
	currentSituation: z.enum(
		[
			"Ensino Médio",
			"Faculdade",
			"Técnico",
			"Vestibular",
			"Trabalhando",
			"Desempregado",
		],
		{
			message: "Selecione uma opção válida!",
		}
	),

	howDidYouHear: z
		.string()
		.min(10, { message: "Entrada obrigatória!" })
		.max(200, { message: "Entrada muito longa!" }),
	motivation: z.string().min(20, { message: "Entrada obrigatória!" }),
});
