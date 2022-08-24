import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { IGameData } from 'src/core/entities/IGameData'
import { Ability, Skill } from 'src/core/enums'

export type GameDataDocument = GameDataMongo & Document

@Schema({ collection: 'gamedata' })
export class GameDataMongo implements IGameData {
	@Prop({ type: Array, immutable: true, enum: Ability })
	abilities: Ability[]

	@Prop({ type: Array, immutable: true })
	proficiencyBonusesPerLevel: number[]

	@Prop({ type: Array, immutable: true, enum: Skill })
	skills: Skill[]

	@Prop({ type: Object, immutable: true })
	skillsByAbilities: Record<Skill, Ability>
}

export const GameDataSchema = SchemaFactory.createForClass(GameDataMongo)
