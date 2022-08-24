import { plainToClass } from 'class-transformer'
import { IsNumber, IsString, MinLength, validateSync } from 'class-validator'

class EnvironmentVariables {
	@IsNumber()
	GRAPHQL_API_LOCAL_PORT: number

	@IsNumber()
	GRAPHQL_API_DOCKER_PORT: number

	@IsString()
	@MinLength(4)
	DB_USERNAME: string

	@IsString()
	@MinLength(4)
	DB_PASSWORD: string

	@IsNumber()
	DB_LOCAL_PORT: number

	@IsNumber()
	DB_DOCKER_PORT: number

	@IsString()
	@MinLength(3)
	DB_DATABASE_NAME: string
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToClass(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	})

	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	})

	if (errors.length > 0) {
		throw new Error(errors.toString())
	}

	return validatedConfig
}
