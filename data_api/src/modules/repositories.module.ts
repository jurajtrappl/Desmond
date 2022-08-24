import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { REPOSITORIES_IDENTIFIERS } from 'src/core/repositories/identifiers'
import { schemas, types } from 'src/infrastructure/entities/mongo'
import { CharacterSheetMongoRepository } from 'src/infrastructure/repositories/mongo/CharacterSheet/CharacterSheetMongoRepository'
import { GameDataMongoRepository } from 'src/infrastructure/repositories/mongo/GameData/GameDataMongoRepository'
import { GuildMongoRepository } from 'src/infrastructure/repositories/mongo/Guild/GuildMongoRepository'
import { TimeMongoRepository } from 'src/infrastructure/repositories/mongo/Time/TimeMongoRepository'
import { MongoConfigService } from 'src/infrastructure/services/MongoConfigService'

const mongoRepositories = {
	characterSheet: {
		provide: REPOSITORIES_IDENTIFIERS.CharacterSheet,
		useClass: CharacterSheetMongoRepository,
	},
	gameData: {
		provide: REPOSITORIES_IDENTIFIERS.GameData,
		useClass: GameDataMongoRepository,
	},
	guild: {
		provide: REPOSITORIES_IDENTIFIERS.Guild,
		useClass: GuildMongoRepository,
	},
	time: {
		provide: REPOSITORIES_IDENTIFIERS.Time,
		useClass: TimeMongoRepository,
	},
}

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useClass: MongoConfigService,
			inject: [ConfigService],
		}),
		MongooseModule.forFeature([
			{
				name: types.GameDataMongo.name,
				schema: schemas.GameDataSchema,
			},
			{
				name: types.CharacterSheetMongo.name,
				schema: schemas.CharacterSheetSchema,
			},
			{
				name: types.GuildMongo.name,
				schema: schemas.GuildSchema,
			},
			{ name: types.TimeMongo.name, schema: schemas.TimeSchema },
		]),
	],
	providers: [...Object.values(mongoRepositories)],
	exports: [...Object.values(mongoRepositories)],
})
export class RepositoriesModule {}
