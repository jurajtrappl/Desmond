import { Ability, Skill } from '../enums'

export interface IGameData {
	/**
	 * List of all abilities.
	 */
	abilities: Ability[]

	/**
	 * List of proficiency bonuses for every character level.
	 */
	proficiencyBonusesPerLevel: number[]

	/**
	 * List of all skills.
	 */
	skills: Skill[]

	/**
	 * Collection of skills and their corresponding ability.
	 */
	skillsByAbilities: Record<Skill, Ability>
}
