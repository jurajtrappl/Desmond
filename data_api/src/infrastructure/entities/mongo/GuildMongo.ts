import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { IGuild } from 'src/core/entities/IGuild'

export type GuildDocument = GuildMongo & Document

@Schema({ collection: 'guilds' })
export class GuildMongo implements IGuild {
	@Prop()
	dmId: string

	@Prop({ immutable: true, required: true, unique: true })
	guildId: string

	@Prop()
	prefix: string

	@Prop({ type: Array })
	playerIds: string[]
}

export const GuildSchema = SchemaFactory.createForClass(GuildMongo)
