import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CharacterFilter } from 'src/core/repositories/filters'
import { CharacterSheetRepository } from 'src/core/repositories/types'
import {
	CharacterSheetDocument,
	CharacterSheetMongo,
} from 'src/infrastructure/entities/mongo/CharacterSheetMongo'
import { BaseMongoRepository } from 'src/infrastructure/repositories/mongo/common/BaseMongoRepository'

@Injectable()
export class CharacterSheetMongoRepository
	extends BaseMongoRepository<CharacterSheetDocument, CharacterFilter>
	implements CharacterSheetRepository
{
	constructor(
		@InjectModel(CharacterSheetMongo.name)
		characterSheetModel: Model<CharacterSheetDocument>,
	) {
		super(characterSheetModel)
	}
}
