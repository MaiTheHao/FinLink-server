import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		})
	);

	await app.listen(process.env.PORT ?? 3000, process.env.HOST ?? '0.0.0.0', () => {
		console.log(`Server is running on http://${process.env.HOST ?? '0.0.0.0'}:${process.env.PORT ?? 3000}`);
	});
}
bootstrap();
