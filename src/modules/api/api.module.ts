import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ApiController } from './api.controller';

@Module({
	imports: [AuthModule, UserModule],
	controllers: [ApiController],
})
export class ApiModule {}
