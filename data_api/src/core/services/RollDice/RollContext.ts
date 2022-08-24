import { RollExpressionParser } from './expression/RollExpressionParser'
import { IRollStrategy } from './strategies/IRollStrategy'

export class RollContext {
	constructor(private strategy: IRollStrategy) {}

	setStrategy(strategy: IRollStrategy) {
		this.strategy = strategy
	}

	requestToRoll(expression: string): number[] {
		const expressionParser = new RollExpressionParser()
		const expressions = expressionParser.parse(expression)

		return this.strategy.roll(expressions)
	}
}
