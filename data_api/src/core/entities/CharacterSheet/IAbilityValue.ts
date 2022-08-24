import { Ability } from '../../enums'

export interface IAbilityValue {
	/**
	 * Number that defines the magnitude of the ability. Ranges from 1 to 30.
	 */
	score: number

	/**
	 * Indicator whether the character is proficient in the ability regards to saving throws.
	 */
	isSavingThrowProficient: boolean
}

export type Abilities = Record<Ability, IAbilityValue>
