import { Document, Model, Types } from 'mongoose'
import { IBaseRepository } from 'src/core/repositories/IBaseRepository'

export abstract class BaseMongoRepository<TEntity, TFilter>
	implements IBaseRepository<TEntity, TFilter>
{
	protected constructor(private readonly model: Model<TEntity>) {}

	async delete(filter: TFilter): Promise<TEntity | undefined> {
		return await this.model.remove({ ...filter })
	}

	async find(filter: TFilter): Promise<TEntity | undefined> {
		return await this.model.findOne({ ...filter })
	}

	async findAll(): Promise<TEntity[]> {
		return await this.model.find({})
	}

	async update(
		filter: TFilter,
		updateFields: Partial<TEntity>,
	): Promise<TEntity | undefined> {
		return await this.model.findOneAndUpdate(
			filter,
			{ $set: { ...updateFields } },
			{ new: true },
		)
	}

	async save(dto: TEntity): Promise<TEntity | undefined> {
		const newEntity: Document<unknown, any, TEntity> &
			TEntity & { _id: Types.ObjectId } = new this.model(dto)

		return await newEntity.save()
	}
}
