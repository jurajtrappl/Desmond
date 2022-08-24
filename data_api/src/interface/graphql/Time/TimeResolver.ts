import { Inject } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { REPOSITORIES_IDENTIFIERS } from 'src/core/repositories/identifiers'
import { TimeRepository } from 'src/core/repositories/types'
import { IDateTimeService } from 'src/core/services/DateTime/IDateTimeService'
import { SERVICE_IDENTIFIERS } from 'src/core/services/identifiers'
import { ITimeService } from 'src/core/services/Time/ITimeService'
import { MilitaryTime } from 'src/core/values/MilitaryTime'
import { CharacterFilterInput } from '../common/InputTypes/filters/CharacterFilter'
import { UpdateLocationInput } from './InputTypes/UpdateLocationInput'
import { UpdateTimeInput } from './InputTypes/UpdateTimeInput'
import { TimeGQL } from './ObjectTypes/TimeGQL'

@Resolver(() => TimeGQL)
export class TimeResolver {
	constructor(
		@Inject(REPOSITORIES_IDENTIFIERS.Time)
		private readonly timeRepository: TimeRepository,
		@Inject(SERVICE_IDENTIFIERS.DateTime)
		private readonly dateTimeService: IDateTimeService,
		@Inject(SERVICE_IDENTIFIERS.Time)
		private readonly timeService: ITimeService,
	) {}

	@Query(() => TimeGQL)
	async getTime(
		@Args('filter') filter: CharacterFilterInput,
	): Promise<TimeGQL> {
		const time = await this.timeRepository.find(filter)

		if (!time) {
			throw new Error(`Time does not exist for the filter: ${filter}.`)
		}

		return {
			current: this.dateTimeService.formatDateTime(time.current),
			characterName: time.characterName,
			guildMemberId: time.guildMemberId,
			location: time.location,
		}
	}

	@Mutation(() => TimeGQL)
	async updateLocation(
		@Args('filter') filter: CharacterFilterInput,
		@Args('input')
		{ newLocation }: UpdateLocationInput,
	): Promise<TimeGQL> {
		return this.timeRepository.update(filter, {
			location: newLocation,
		})
	}

	@Mutation(() => TimeGQL)
	async updateTime(
		@Args('filter') filter: CharacterFilterInput,
		@Args('input')
		{ militaryTimeOffset }: UpdateTimeInput,
	): Promise<TimeGQL> {
		return this.timeService.updateCurrentTime(
			filter,
			new MilitaryTime(militaryTimeOffset),
		)
	}
}
