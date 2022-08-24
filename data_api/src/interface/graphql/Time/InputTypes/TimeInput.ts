import { Field, InputType } from '@nestjs/graphql'
import { IsDate } from 'class-validator'
import { ITime } from 'src/core/entities/ITime'

@InputType()
export class TimeInput implements ITime {
	@Field(() => String)
	characterName: string

	@Field(() => String)
	@IsDate()
	current: string

	@Field(() => String)
	guildMemberId: string

	@Field(() => String)
	location: string
}
