import { IRollExpression } from 'src/core/values/rollExpression/IRollExpression'
import { BaseDiceRoller } from './BaseDiceRoller'

export class NormalDiceRoller extends BaseDiceRoller {
	roll(expressions: IRollExpression[]): number[] {
		return this.rollOnce(expressions)
	}
}
