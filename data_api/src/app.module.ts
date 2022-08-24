import 'reflect-metadata'
import { Module } from '@nestjs/common'
import { registerEnums } from './interface/graphql/register-enums'
import { validate } from './env.validation'
import { ConfigModule } from '@nestjs/config'
import { InterfaceGQLModule } from './modules/interfaceGQL.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			validate,
		}),
		InterfaceGQLModule,
	],
})
export class AppModule {}

registerEnums()
