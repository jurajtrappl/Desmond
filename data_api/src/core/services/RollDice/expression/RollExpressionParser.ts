import { IRollExpression } from 'src/core/values/rollExpression/IRollExpression'
import { RollExpressionBonus } from 'src/core/values/rollExpression/RollExpressionBonus'
import { RollExpressionDice } from 'src/core/values/rollExpression/RollExpressionDice'

export class RollExpressionParser {
	parse(expression: string): IRollExpression[] {
		const parts = expression.split('+')

		return parts.map((part: string) => {
			if (part.includes('d')) {
				return new RollExpressionDice(part)
			} else {
				return new RollExpressionBonus(part)
			}
		})
	}
}
