import { Inject } from '@nestjs/common'
import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { SERVICE_IDENTIFIERS } from 'src/core/services/identifiers'
import { IRollDiceService } from 'src/core/services/RollDice/IRollDiceService'
import { RollDiceInput } from './InputTypes/RollDiceInput'
import { ExtendedRollResultGQL } from './ObjectTypes/RollDiceGQL'
import { CharacterFilterInput } from '../common/InputTypes/filters/CharacterFilter'
import { RollSkillInput } from './InputTypes/RollSkill'
import { RollAbilityInput } from './InputTypes/RollAbility'

@Resolver()
export class RollDiceResolver {
	constructor(
		@Inject(SERVICE_IDENTIFIERS.RollDice)
		private readonly rollDiceService: IRollDiceService,
	) {}

	@Query(() => ExtendedRollResultGQL)
	async rollAbilityCheck(
		@Args('filter') filter: CharacterFilterInput,
		@Args('input')
		{ skill, ...rollOptions }: RollSkillInput,
	): Promise<ExtendedRollResultGQL> {
		return this.rollDiceService.rollAbilityCheck(skill, filter, rollOptions)
	}

	@Query(() => [Int])
	async rollDice(
		@Args('input')
		{ expression, ...rollOptions }: RollDiceInput,
	): Promise<number[]> {
		return this.rollDiceService.roll(expression, rollOptions)
	}

	@Query(() => ExtendedRollResultGQL)
	async rollSavingThrow(
		@Args('filter') filter: CharacterFilterInput,
		@Args('input')
		{ ability, ...rollOptions }: RollAbilityInput,
	): Promise<ExtendedRollResultGQL> {
		return this.rollDiceService.rollSavingThrow(
			ability,
			filter,
			rollOptions,
		)
	}
}
