export class MilitaryTime {
	hours: number
	minutes: number

	constructor(value: string) {
		const splitted = value.split(':')

		if (splitted.length != 2) {
			throw new Error(`Invalid military time value: ${value}.`)
		}

		const hours = parseInt(splitted[0], 10)
		const minutes = parseInt(splitted[1], 10)

		if (isNaN(hours) || isNaN(minutes)) {
			throw new Error(`Invalid military time value: ${value}.`)
		}

		this.hours = hours
		this.minutes = minutes
	}
}
