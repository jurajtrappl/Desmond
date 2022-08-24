import { Query, Resolver } from '@nestjs/graphql'
import { Inject } from '@nestjs/common'
import { GameDataGQL } from './ObjectTypes/GameDataGQL'
import { REPOSITORIES_IDENTIFIERS } from 'src/core/repositories/identifiers'
import { GameDataRepository } from 'src/core/repositories/types'

@Resolver(() => GameDataGQL)
export class GameDataResolver {
	constructor(
		@Inject(REPOSITORIES_IDENTIFIERS.GameData)
		private readonly gameDataRepository: GameDataRepository,
	) {}

	@Query(() => GameDataGQL)
	async getGameData(): Promise<GameDataGQL> {
		return this.gameDataRepository.find({})
	}
}
