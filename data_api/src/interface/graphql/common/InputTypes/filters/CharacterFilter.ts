import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CharacterFilterInput {
	@Field(() => String, { nullable: true })
	characterName?: string

	@Field(() => String, { nullable: true })
	guildMemberId?: string
}
