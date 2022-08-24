import { Field, InputType } from '@nestjs/graphql'
import { RollOptionsInput } from './RollOptions'

@InputType()
export class RollDiceInput extends RollOptionsInput {
	@Field(() => String)
	expression: string
}
