import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JsonDbService } from './json-db.service';
import { databaseProviders } from './mongo-db.provider';
import { modelsProviders } from './models.provider';

@Module({
	imports: [ConfigModule],
	providers: [JsonDbService, ...databaseProviders, ...modelsProviders],
	exports: [JsonDbService, ...databaseProviders, ...modelsProviders],
})
export class DatabaseModule {}
