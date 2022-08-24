import { Ability, Skill } from 'src/core/enums'
import { CharacterFilter } from 'src/core/repositories/filters'

export interface IThrowBonusesService {
	abilityBonus(filter: CharacterFilter, ability: Ability): Promise<number>

	abilitySavingThrowBonus(
		filter: CharacterFilter,
		ability: Ability,
	): Promise<number>

	skillBonus(filter: CharacterFilter, skill: Skill): Promise<number>
}
