import { MilitaryTime } from 'src/core/values/MilitaryTime'

export interface IDateTimeService {
	/**
	 * Returns the given date time as a date string in the format .
	 * @param dateTime date time to format.
	 */
	formatDate(dateTime: string): string

	/**
	 * Returns the given date time as a date time string in the format .
	 * @param dateTime date time to format.
	 */
	formatDateTime(dateTime: string): string

	/**
	 * Returns the given date time as a time string in the format .
	 * @param dateTime date time to format.
	 */
	formatTime(dateTime: string): string

	/**
	 * Adds the given hours and minutes to the given date time.
	 * @param dateTime date time to add hours and minutes to.
	 * @param time hours and minutes to add.
	 */
	update(dateTime: string, time: MilitaryTime): string
}
