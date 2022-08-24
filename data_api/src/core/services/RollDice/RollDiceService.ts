import { Inject, Injectable } from '@nestjs/common'
import { Ability, Skill } from 'src/core/enums'
import { CharacterFilter } from 'src/core/repositories/filters'
import { ExtendedRollResult } from 'src/core/values/rollExpression/IRollExpression'
import { SERVICE_IDENTIFIERS } from '../identifiers'
import { IThrowBonusesService } from '../ThrowBonuses/IThrowBonusesService'
import { IRollDiceService, RollOptions } from './IRollDiceService'
import { RollContext } from './RollContext'
import { RollStrategySelector } from './RollStrategySelector'

@Injectable()
export class RollDiceService implements IRollDiceService {
	constructor(
		@Inject(SERVICE_IDENTIFIERS.RollStrategySelector)
		private readonly rollStrategySelector: RollStrategySelector,
		@Inject(SERVICE_IDENTIFIERS.ThrowBonuses)
		private readonly scoresService: IThrowBonusesService,
	) {}

	roll(expression: string, options: RollOptions): number[] {
		const strategy = this.rollStrategySelector.select(options)
		const rollContext = new RollContext(strategy)

		return rollContext.requestToRoll(expression)
	}

	async rollAbilityCheck(
		skill: Skill,
		filter: CharacterFilter,
		options: RollOptions,
	): Promise<ExtendedRollResult> {
		const bonus = await this.scoresService.skillBonus(filter, skill)
		const expression = `1d20+${bonus}`

		return { rolls: this.roll(expression, options), expression }
	}

	async rollSavingThrow(
		ability: Ability,
		filter: CharacterFilter,
		options: RollOptions,
	): Promise<ExtendedRollResult> {
		const bonus = await this.scoresService.abilitySavingThrowBonus(
			filter,
			ability,
		)
		const expression = `1d20+${bonus}`

		return { rolls: this.roll(expression, options), expression }
	}
}
