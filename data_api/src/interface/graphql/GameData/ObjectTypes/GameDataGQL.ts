import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { IGameData } from 'src/core/entities/IGameData'
import { Ability, Skill } from 'src/core/enums'

@ObjectType()
export class GameDataGQL implements IGameData {
	@Field(() => [Ability])
	abilities: Ability[]

	@Field(() => [Int])
	proficiencyBonusesPerLevel: number[]

	@Field(() => [Skill])
	skills: Skill[]

	@Field(() => GraphQLJSONObject)
	skillsByAbilities: Record<Skill, Ability>
}
