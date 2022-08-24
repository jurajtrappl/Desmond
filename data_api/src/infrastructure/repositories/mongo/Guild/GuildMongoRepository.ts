import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { GuildIdFilter } from 'src/core/repositories/filters'
import { GuildRepository } from 'src/core/repositories/types'
import {
	GuildDocument,
	GuildMongo,
} from 'src/infrastructure/entities/mongo/GuildMongo'
import { BaseMongoRepository } from '../common/BaseMongoRepository'

@Injectable()
export class GuildMongoRepository
	extends BaseMongoRepository<GuildDocument, GuildIdFilter>
	implements GuildRepository
{
	constructor(
		@InjectModel(GuildMongo.name)
		guildModel: Model<GuildDocument>,
	) {
		super(guildModel)
	}
}
