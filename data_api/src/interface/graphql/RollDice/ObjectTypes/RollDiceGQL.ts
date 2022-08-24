import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ExtendedRollResultGQL {
	@Field(() => String)
	expression: string

	@Field(() => [Int])
	rolls: number[]
}
