import { Abilities } from './IAbilityValue'
import { Skills } from './ISkillValue'

export interface ICharacterSheet {
	abilities: Abilities

	/**
	 * Discord identification number of a user.
	 */
	guildMemberId: string

	level: number

	skills: Skills
}
