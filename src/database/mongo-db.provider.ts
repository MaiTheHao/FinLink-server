import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
	{
		provide: 'MONGO_CONNECTION',
		useFactory: async (configService: ConfigService): Promise<typeof mongoose> => {
			const mongoUri = configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/finlink';

			try {
				return await mongoose.connect(mongoUri);
			} catch (error) {
				console.error('Không thể kết nối tới MongoDB:', error);
				throw error;
			}
		},
		inject: [ConfigService],
	},
];
