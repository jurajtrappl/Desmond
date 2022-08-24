import { Ability, Skill } from 'src/core/enums'
import { CharacterFilter } from 'src/core/repositories/filters'
import { ExtendedRollResult } from 'src/core/values/rollExpression/IRollExpression'

export interface IRollDiceService {
	roll(expression: string, options: RollOptions): number[]

	rollAbilityCheck(
		skill: Skill,
		filter: CharacterFilter,
		options: RollOptions,
	): Promise<ExtendedRollResult>

	rollSavingThrow(
		ability: Ability,
		filter: CharacterFilter,
		options: RollOptions,
	): Promise<ExtendedRollResult>
}

export type RollOptions = {
	advantage: boolean

	disadvantage: boolean

	inspiration: boolean
}
