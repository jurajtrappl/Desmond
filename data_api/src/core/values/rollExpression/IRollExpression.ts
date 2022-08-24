export interface IRollExpression {
	roll(): number[]
}

export type ExtendedRollResult = {
	rolls: number[]

	expression: string
}
