import { IRollExpression } from './IRollExpression'

export class RollExpressionDice implements IRollExpression {
	count: number

	type: number

	constructor(expression: string) {
		const [count, type] = expression.split('d')

		this.count = Number(count)
		this.type = Number(type)
	}

	roll(): number[] {
		const rolls = []
		for (let i = 0; i < this.count; i++) {
			rolls.push(this.randomRoll())
		}

		return rolls
	}

	private randomRoll() {
		return Math.floor(Math.random() * this.type) + 1
	}
}
