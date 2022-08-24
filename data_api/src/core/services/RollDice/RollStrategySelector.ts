import { Injectable } from '@nestjs/common'
import { RollOptions } from './IRollDiceService'
import { AdvantageDiceRoller } from './strategies/AdvantageDiceRoller'
import { DisadvantageDiceRoller } from './strategies/DisadvantageDiceRoller'
import { IRollStrategy } from './strategies/IRollStrategy'
import { NormalDiceRoller } from './strategies/NormalDiceRoller'

@Injectable()
export class RollStrategySelector {
	select({
		advantage,
		disadvantage,
		inspiration,
	}: RollOptions): IRollStrategy {
		const onlyDisadvantage = disadvantage && !advantage && !inspiration
		if (onlyDisadvantage) {
			return new DisadvantageDiceRoller()
		}

		const advantagesNegates = advantage && disadvantage
		const inspirationNegatesDisadvantage = inspiration && disadvantage
		const none = !advantage && !disadvantage && !inspiration
		if (advantagesNegates || inspirationNegatesDisadvantage || none) {
			return new NormalDiceRoller()
		}

		return new AdvantageDiceRoller()
	}
}
