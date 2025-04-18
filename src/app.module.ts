import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './modules/api/api.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
			serveRoot: '/static/',
			exclude: ['/api*'],
		}),
		ApiModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {}
}
