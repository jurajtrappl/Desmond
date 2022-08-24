import { IRollExpression } from 'src/core/values/rollExpression/IRollExpression'

export interface IRollStrategy {
	roll(expressions: IRollExpression[]): number[]
}
