import { registerEnumType } from '@nestjs/graphql'
import { Ability, Skill } from 'src/core/enums'

export const registerEnums = () => {
	registerEnumType(Ability, { name: 'Ability' })

	registerEnumType(Skill, { name: 'Skill' })
}
