export interface IGuild {
	/**
	 * Dungeon master's identification.
	 */
	dmId: string

	/**
	 * Discord's server (guild) identification.
	 */
	guildId: string

	/**
	 * Command prefix.
	 */
	prefix: string

	/**
	 * Collection of ID's of players.
	 */
	playerIds: string[]
}
