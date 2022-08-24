import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RollOptionsInput {
	@Field(() => Boolean)
	advantage: boolean

	@Field(() => Boolean)
	disadvantage: boolean

	@Field(() => Boolean)
	inspiration: boolean
}
