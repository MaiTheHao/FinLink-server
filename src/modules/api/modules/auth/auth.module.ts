import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from '../email/email.module';
import { UserModule } from '../user/user.module';
import { LogModule } from '../../../log/log.module';

@Module({
	imports: [
		DatabaseModule,
		RepositoriesModule,
		UserModule,
		JwtModule.registerAsync({
			global: true,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (cs: ConfigService) => ({
				global: true,
				secret: cs.get<string>('JWT_SECRET', 'secretKey'),
				signOptions: {
					expiresIn: cs.get<string>('JWT_EXP', '1h'),
				},
			}),
		}),
		EmailModule,
		LogModule,
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
