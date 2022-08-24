import { Field, InputType } from '@nestjs/graphql'
import { IsEnum } from 'class-validator'
import { Skill } from 'src/core/enums'
import { RollOptionsInput } from './RollOptions'

@InputType()
export class RollSkillInput extends RollOptionsInput {
	@Field(() => Skill)
	@IsEnum(Skill)
	skill: Skill
}
