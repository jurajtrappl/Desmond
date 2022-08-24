import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BaseMongoRepository } from '../common/BaseMongoRepository'
import { GameDataRepository } from 'src/core/repositories/types'
import {
	GameDataDocument,
	GameDataMongo,
} from 'src/infrastructure/entities/mongo/GameDataMongo'
import { NoneFilter } from 'src/core/repositories/filters'

@Injectable()
export class GameDataMongoRepository
	extends BaseMongoRepository<GameDataDocument, NoneFilter>
	implements GameDataRepository
{
	constructor(
		@InjectModel(GameDataMongo.name)
		gameDataModel: Model<GameDataDocument>,
	) {
		super(gameDataModel)
	}
}
