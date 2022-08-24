import { ITime } from 'src/core/entities/ITime'
import { CharacterFilter } from 'src/core/repositories/filters'
import { MilitaryTime } from 'src/core/values/MilitaryTime'

export interface ITimeService {
	/**
	 * Updates the curernt date and time of the character time data.
	 * @param filter character name of the player whose time is to be updated.
	 * @param time hours and minutes to add.
	 */
	updateCurrentTime(
		filter: CharacterFilter,
		time: MilitaryTime,
	): Promise<ITime>
}
