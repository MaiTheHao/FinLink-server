import { Module } from '@nestjs/common';
import { JsonDbService } from './json-db.service';
import { MongoDbProvider } from './mongo-db.provider';

@Module({
	controllers: [],
	providers: [JsonDbService, ...MongoDbProvider],
	exports: [JsonDbService, ...MongoDbProvider],
})
export class DatabaseModule {}
