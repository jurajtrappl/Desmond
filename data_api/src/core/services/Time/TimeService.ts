import { Inject, Injectable } from '@nestjs/common'
import { ITime } from 'src/core/entities/ITime'
import { EntityNotFoundError } from 'src/core/repositories/error'
import { CharacterFilter } from 'src/core/repositories/filters'
import { REPOSITORIES_IDENTIFIERS } from 'src/core/repositories/identifiers'
import { TimeRepository } from 'src/core/repositories/types'
import { MilitaryTime } from 'src/core/values/MilitaryTime'
import { IDateTimeService } from '../DateTime/IDateTimeService'
import { SERVICE_IDENTIFIERS } from '../identifiers'
import { ITimeService } from './ITimeService'

@Injectable()
export class TimeService implements ITimeService {
	constructor(
		@Inject(SERVICE_IDENTIFIERS.DateTime)
		private readonly dateTimeService: IDateTimeService,
		@Inject(REPOSITORIES_IDENTIFIERS.Time)
		private readonly timeRepository: TimeRepository,
	) {}

	async updateCurrentTime(
		filter: CharacterFilter,
		time: MilitaryTime,
	): Promise<ITime> {
		const characterTime = await this.timeRepository.find({ ...filter })

		if (!characterTime) {
			throw new EntityNotFoundError(filter)
		}

		return await this.timeRepository.update(
			{ ...filter },
			{
				current: this.dateTimeService.update(
					characterTime.current,
					time,
				),
			},
		)
	}
}
