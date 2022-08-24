import { IRollExpression } from 'src/core/values/rollExpression/IRollExpression'
import { IRollStrategy } from './IRollStrategy'

export abstract class BaseDiceRoller implements IRollStrategy {
	abstract roll(expressions: IRollExpression[]): number[]

	rollOnce(expressions: IRollExpression[]): number[] {
		return expressions.reduce(
			(acc: number[], expression: IRollExpression) =>
				acc.concat(...expression.roll()),
			[],
		)
	}

	total(rolls: number[]): number {
		return rolls.reduce((acc, roll) => acc + roll, 0)
	}
}
