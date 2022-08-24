import { GameDataResolver } from './GameData/GameDataResolver'
import { GuildResolver } from './Guild/GuildResolver'
import { RollDiceResolver } from './RollDice/RollDiceResolver'
import { TimeResolver } from './Time/TimeResolver'

export const resolvers = [
	GameDataResolver,
	GuildResolver,
	RollDiceResolver,
	TimeResolver,
]
