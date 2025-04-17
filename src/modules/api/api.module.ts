import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { ApiController } from './api.controller';

@Module({
	imports: [AuthModule, UserModule, DatabaseModule, RepositoriesModule],
	controllers: [ApiController],
})
export class ApiModule {}
