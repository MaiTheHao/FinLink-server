import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	imports: [DatabaseModule, RepositoriesModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
