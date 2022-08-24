import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
	constructor(private configService: ConfigService) {}

	createMongooseOptions = (): MongooseModuleOptions => ({
		uri: this.constructUri(),
	})

	private constructUri(): string {
		const username = this.configService.get('DB_USERNAME')
		const password = this.configService.get('DB_PASSWORD')
		const dockerPort = this.configService.get('DB_DOCKER_PORT')
		const databaseName = this.configService.get('DB_DATABASE_NAME')

		return `mongodb://${username}:${password}@data_db:${dockerPort}/${databaseName}?authSource=admin`
	}
}
