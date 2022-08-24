import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateLocationInput {
	@Field(() => String)
	newLocation: string
}
