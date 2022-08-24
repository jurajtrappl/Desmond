import { Skill } from '../../enums'

export interface ISkillValue {
	isProficient: boolean

	isDoubleProficient: boolean

	hasExpertise: boolean
}

export type Skills = Record<Skill, ISkillValue>
