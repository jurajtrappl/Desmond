import { IRollExpression } from 'src/core/values/rollExpression/IRollExpression'
import { BaseDiceRoller } from './BaseDiceRoller'

export class DisadvantageDiceRoller extends BaseDiceRoller {
	roll(expressions: IRollExpression[]): number[] {
		const firstResult = this.rollOnce(expressions)
		const secondResult = this.rollOnce(expressions)

		return this.total(firstResult) >= this.total(secondResult)
			? secondResult
			: firstResult
	}
}
