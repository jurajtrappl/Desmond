import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ServicesModule } from './service.module'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { resolvers } from '../interface/graphql'
import { RepositoriesModule } from './repositories.module'

@Module({
	imports: [
		RepositoriesModule,
		ServicesModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: false,
			plugins: [ApolloServerPluginLandingPageLocalDefault()],
			autoSchemaFile: 'schema.gql',
		}),
	],
	providers: [...resolvers],
	exports: [...resolvers],
})
export class InterfaceGQLModule {}
