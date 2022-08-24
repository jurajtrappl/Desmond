import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GuildFilterInput {
	@Field(() => String)
	guildId: string
}
