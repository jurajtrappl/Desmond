import { Field, InputType } from '@nestjs/graphql'
import { IsEnum } from 'class-validator'
import { Ability } from 'src/core/enums'
import { RollOptionsInput } from './RollOptions'

@InputType()
export class RollAbilityInput extends RollOptionsInput {
	@Field(() => Ability)
	@IsEnum(Ability)
	ability: Ability
}
