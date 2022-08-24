import { Field, InputType } from '@nestjs/graphql'
import { IsMilitaryTime } from 'class-validator'

@InputType()
export class UpdateTimeInput {
	@Field(() => String)
	@IsMilitaryTime()
	militaryTimeOffset: string
}
