import { Field, ObjectType } from '@nestjs/graphql'
import { ITime } from 'src/core/entities/ITime'

@ObjectType()
export class TimeGQL implements ITime {
	@Field(() => String)
	current: string

	@Field(() => String)
	characterName: string

	@Field(() => String)
	guildMemberId: string

	@Field(() => String)
	location: string
}
