import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { JsonLogRepository } from 'src/repositories/json/json-log.repository';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	imports: [DatabaseModule, RepositoriesModule],
	providers: [LogService, JsonLogRepository],
	exports: [LogService],
})
export class LogModule {}
