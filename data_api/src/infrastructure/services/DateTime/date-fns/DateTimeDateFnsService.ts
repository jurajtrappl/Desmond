import { addHours, addMinutes, format } from 'date-fns'
import { IDateTimeService } from 'src/core/services/DateTime/IDateTimeService'
import { MilitaryTime } from 'src/core/values/MilitaryTime'

export class DateTimeDateFnsService implements IDateTimeService {
	formatDate(dateTime: string): string {
		return format(new Date(dateTime), 'dd. MM. yyyy')
	}

	formatDateTime(dateTime: string): string {
		return `${this.formatDate(dateTime)}, ${this.formatTime(dateTime)}`
	}

	formatTime(dateTime: string): string {
		return format(new Date(dateTime), 'HH:mm')
	}

	update(dateTime: string, time: MilitaryTime): string {
		return addMinutes(
			addHours(new Date(dateTime), time.hours),
			time.minutes,
		).toISOString()
	}
}
