import { Inject } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { REPOSITORIES_IDENTIFIERS } from 'src/core/repositories/identifiers'
import { GuildRepository } from 'src/core/repositories/types'
import { GuildFilterInput } from './InputTypes/GuildFilter'
import { GuildGQL } from './ObjectTypes/GuildGQL'

@Resolver(() => GuildGQL)
export class GuildResolver {
	constructor(
		@Inject(REPOSITORIES_IDENTIFIERS.Guild)
		private readonly guildRepository: GuildRepository,
	) {}

	@Query(() => GuildGQL)
	async getGuild(
		@Args('filter') filter: GuildFilterInput,
	): Promise<GuildGQL> {
		return this.guildRepository.find(filter)
	}
}
