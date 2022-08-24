import { Field, ObjectType } from '@nestjs/graphql'
import { IGuild } from 'src/core/entities/IGuild'

@ObjectType()
export class GuildGQL implements IGuild {
	@Field(() => String)
	dmId: string

	@Field(() => String)
	guildId: string

	@Field(() => String)
	prefix: string

	@Field(() => [String])
	playerIds: string[]
}
