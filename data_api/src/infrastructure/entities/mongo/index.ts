import { GameDataMongo, GameDataSchema } from './GameDataMongo'
import {
	CharacterSheetMongo,
	CharacterSheetSchema,
} from './CharacterSheetMongo'
import { GuildMongo, GuildSchema } from './GuildMongo'
import { TimeMongo, TimeSchema } from './TimeMongo'

export const types = {
	GameDataMongo,
	CharacterSheetMongo,
	GuildMongo,
	TimeMongo,
}

export const schemas = {
	GameDataSchema,
	CharacterSheetSchema,
	GuildSchema,
	TimeSchema,
}
