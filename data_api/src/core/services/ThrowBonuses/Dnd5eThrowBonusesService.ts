import { Inject, Injectable } from '@nestjs/common'
import { Ability, Skill } from 'src/core/enums'
import {
	EntityNotFoundError,
	GameDataNotFoundError,
} from 'src/core/repositories/error'
import { CharacterFilter } from 'src/core/repositories/filters'
import { REPOSITORIES_IDENTIFIERS } from 'src/core/repositories/identifiers'
import {
	CharacterSheetRepository,
	GameDataRepository,
} from 'src/core/repositories/types'
import { IThrowBonusesService } from './IThrowBonusesService'

@Injectable()
export class Dnd5eThrowBonusesService implements IThrowBonusesService {
	constructor(
		@Inject(REPOSITORIES_IDENTIFIERS.CharacterSheet)
		private readonly characterSheetRepository: CharacterSheetRepository,
		@Inject(REPOSITORIES_IDENTIFIERS.GameData)
		private readonly gameDataRepository: GameDataRepository,
	) {}

	async abilityBonus(
		filter: CharacterFilter,
		ability: Ability,
	): Promise<number> {
		const characterSheet = await this.characterSheetRepository.find({
			...filter,
		})

		if (!characterSheet) {
			throw new EntityNotFoundError(filter)
		}

		return this.modifier(characterSheet.abilities[ability].score)
	}

	async abilitySavingThrowBonus(
		filter: CharacterFilter,
		ability: Ability,
	): Promise<number> {
		const characterSheet = await this.characterSheetRepository.find({
			...filter,
		})

		if (!characterSheet) {
			throw new EntityNotFoundError(filter)
		}

		let bonus = await this.abilityBonus(filter, ability)
		const { abilities, level } = characterSheet
		if (abilities[ability].isSavingThrowProficient) {
			bonus += await this.proficiencyBonusForLevel(level)
		}

		return bonus
	}

	async skillBonus(filter: CharacterFilter, skill: Skill): Promise<number> {
		const characterSheet = await this.characterSheetRepository.find({
			...filter,
		})

		if (!characterSheet) {
			throw new EntityNotFoundError(filter)
		}

		const { abilities, level, skills } = characterSheet
		const { isProficient, isDoubleProficient, hasExpertise } = skills[skill]
		const gameData = await this.gameDataRepository.find({})

		if (!gameData) {
			throw new GameDataNotFoundError()
		}

		const { skillsByAbilities } = gameData
		let bonus = 0
		const proficiencyBonus = await this.proficiencyBonusForLevel(level)

		if (isDoubleProficient || hasExpertise) {
			bonus += 2 * proficiencyBonus
		}

		if (isProficient && !bonus) {
			bonus += proficiencyBonus
		}

		return bonus + this.modifier(abilities[skillsByAbilities[skill]].score)
	}

	/**
	 * Returns a number that represents the modifier to the given score.
	 * @param score score to calculate the modifier from.
	 */
	private modifier(score: number) {
		return Math.floor((score - 10) / 2)
	}

	private async proficiencyBonusForLevel(level: number): Promise<number> {
		const gameData = await this.gameDataRepository.find({})

		if (!gameData) {
			throw new GameDataNotFoundError()
		}

		return gameData.proficiencyBonusesPerLevel[level - 1]
	}
}
