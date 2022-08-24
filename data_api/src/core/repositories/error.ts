export class EntityNotFoundError extends Error {
	constructor(filter) {
		super(`Entity not found by the filter: '${filter}'`)

		Object.setPrototypeOf(this, EntityNotFoundError.prototype)
	}
}

export class GameDataNotFoundError extends Error {
	constructor() {
		super(`Game data not found.`)

		Object.setPrototypeOf(this, GameDataNotFoundError.prototype)
	}
}
