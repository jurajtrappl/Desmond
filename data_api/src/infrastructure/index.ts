import { CharacterSheetMongoRepository } from './repositories/mongo/CharacterSheet/CharacterSheetMongoRepository'
import { MongoConfigService } from './services/MongoConfigService'
import { TimeMongoRepository } from './repositories/mongo/Time/TimeMongoRepository'
import { GuildMongoRepository } from './repositories/mongo/Guild/GuildMongoRepository'
import { GameDataMongoRepository } from './repositories/mongo/GameData/GameDataMongoRepository'

export default [
	MongoConfigService,
	CharacterSheetMongoRepository,
	GameDataMongoRepository,
	GuildMongoRepository,
	TimeMongoRepository,
]
