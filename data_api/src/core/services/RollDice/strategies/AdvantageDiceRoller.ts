import { IRollExpression } from 'src/core/values/rollExpression/IRollExpression'
import { BaseDiceRoller } from './BaseDiceRoller'

export class AdvantageDiceRoller extends BaseDiceRoller {
	roll(expressions: IRollExpression[]): number[] {
		const firstResult = this.rollOnce(expressions)
		const secondResult = this.rollOnce(expressions)

		return this.total(firstResult) >= this.total(secondResult)
			? firstResult
			: secondResult
	}
}
