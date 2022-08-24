export interface ITime {
	/**
	 * Name of the character.
	 */
	characterName: string

	/**
	 * Current date and time of the character.
	 */
	current: string

	/**
	 * Discord identification number of a user.
	 */
	guildMemberId: string

	/**
	 * Current character's location.
	 */
	location: string
}
