import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Abilities } from 'src/core/entities/CharacterSheet/IAbilityValue'
import { ICharacterSheet } from 'src/core/entities/CharacterSheet/ICharacterSheet'
import { Skills } from 'src/core/entities/CharacterSheet/ISkillValue'

export type CharacterSheetDocument = CharacterSheetMongo & Document

@Schema({ autoIndex: true, collection: 'charactersheets' })
export class CharacterSheetMongo implements ICharacterSheet {
	@Prop({ type: Object })
	abilities: Abilities

	@Prop()
	guildId: string

	@Prop()
	guildMemberId: string

	@Prop({ default: 1, max: 20 })
	level: number

	@Prop({ immutable: true, type: Object })
	skills: Skills
}

export const CharacterSheetSchema =
	SchemaFactory.createForClass(CharacterSheetMongo)

CharacterSheetSchema.index({ guildId: 1, guildMemberId: 1 }, { unique: true })
