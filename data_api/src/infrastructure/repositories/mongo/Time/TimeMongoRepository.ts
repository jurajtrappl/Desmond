import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
	TimeDocument,
	TimeMongo,
} from 'src/infrastructure/entities/mongo/TimeMongo'
import { BaseMongoRepository } from '../common/BaseMongoRepository'
import { TimeRepository } from 'src/core/repositories/types'
import { CharacterFilter } from 'src/core/repositories/filters'

@Injectable()
export class TimeMongoRepository
	extends BaseMongoRepository<TimeDocument, CharacterFilter>
	implements TimeRepository
{
	constructor(@InjectModel(TimeMongo.name) timeModel: Model<TimeDocument>) {
		super(timeModel)
	}
}
