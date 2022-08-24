import { IRollExpression } from './IRollExpression'

export class RollExpressionBonus implements IRollExpression {
	constructor(private readonly value: string) {}

	roll(): number[] {
		const bonus = Number(this.value)

		return [bonus]
	}
}
