import { prismaClient } from "@/adapters/db/prisma";
import { MembershipType } from "@/core/domain/dtos/membership-form.dto";
import {
	CurrentSituation,
	DisruptionLevel,
	OnlinePresence,
} from "@prisma/client";

export class MembershipApplicationService {
	async create(data: MembershipType): Promise<boolean> {
		const {
			age,
			state,
			email,
			discordId,
			youtubeId,
			motivation,
			howDidYouHear,
			neurodivergence,
			youtubeChannels,
			politicalIdeology,
			escaralhamentoLevel,
			onlinePresence,
			currentSituation,
		} = data;

		try {
			const membershipApplication =
				await prismaClient.membershipApplication.create({
					data: {
						age: Number.parseInt(age, 10),
						state,
						email,
						discordId,
						youtubeId,
						motivation,
						howDidYouHear,
						neurodivergence,
						youtubeChannels,
						politicalIdeology,
						disruptionLevel: disruptionLevelMap[escaralhamentoLevel],
						onlinePresence: onlinePresenceMap[onlinePresence],
						currentSituation: currentSituationMap[currentSituation],
					},
				});

			return membershipApplication ? true : false;
		} catch (error) {
			console.error("Error creating membership application:", error);
			return false;
		}
	}
}

/**
 * Mappings from MembershipType fields to enum values
 * defined in the Prisma schema.
 */

const onlinePresenceMap: Record<
	MembershipType["onlinePresence"],
	OnlinePresence
> = {
	"Pouco ativo": OnlinePresence.Slightly_Active,
	"Moderadamente online": OnlinePresence.Moderately_Online,
	"Cronicamente online": OnlinePresence.Chronically_Online,
};

const currentSituationMap: Record<
	MembershipType["currentSituation"],
	CurrentSituation
> = {
	"Ensino Médio": CurrentSituation.High_School,
	Faculdade: CurrentSituation.College,
	Técnico: CurrentSituation.Technical_School,
	Vestibular: CurrentSituation.Applying_To_College,
	Trabalhando: CurrentSituation.Working,
	Desempregado: CurrentSituation.Unemployed,
};

const disruptionLevelMap: Record<
	MembershipType["escaralhamentoLevel"],
	DisruptionLevel
> = {
	Iniciante: DisruptionLevel.Beginner,
	"Escaralhador médio": DisruptionLevel.Intermediate_Disruptor,
	Doutrinador: DisruptionLevel.Master_Theorist,
};
