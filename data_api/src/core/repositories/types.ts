import { ICharacterSheet } from '../entities/CharacterSheet/ICharacterSheet'
import { IGameData } from '../entities/IGameData'
import { IGuild } from '../entities/IGuild'
import { ITime } from '../entities/ITime'
import { CharacterFilter, GuildIdFilter, NoneFilter } from './filters'
import { IBaseRepository } from './IBaseRepository'

export type CharacterSheetRepository = IBaseRepository<
	ICharacterSheet,
	CharacterFilter
>

export type GameDataRepository = IBaseRepository<IGameData, NoneFilter>

export type GuildRepository = IBaseRepository<IGuild, GuildIdFilter>

export type TimeRepository = IBaseRepository<ITime, CharacterFilter>
