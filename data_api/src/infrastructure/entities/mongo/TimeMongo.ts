import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ITime } from 'src/core/entities/ITime'

export type TimeDocument = TimeMongo & Document

@Schema({ autoIndex: true, collection: 'times' })
export class TimeMongo implements ITime {
	@Prop()
	characterName: string

	@Prop({ default: '' })
	current: string

	@Prop({ immutable: true, required: true, unique: true })
	guildId: string

	@Prop({ immutable: true, required: true })
	guildMemberId: string

	@Prop({ default: '' })
	location: string
}

export const TimeSchema = SchemaFactory.createForClass(TimeMongo)

TimeSchema.index(
	{ characterName: 1, guildId: 1, guildMemberId: 1 },
	{ unique: true },
)
