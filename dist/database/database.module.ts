import { Module } from '@nestjs/common';
import { JsonDbService } from './json-db.service';

@Module({
	controllers: [],
	providers: [JsonDbService],
	exports: [JsonDbService],
})
export class DatabaseModule {}
