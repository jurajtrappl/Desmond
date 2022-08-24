export type GuildIdFilter = {
	guildId: string
}

export type CharacterFilter = {
	characterName?: string

	guildMemberId?: string
}

export type NoneFilter = Record<string, never>
