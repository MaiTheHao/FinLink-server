import * as mongoose from 'mongoose';

export const MongoDbProvider = [
	{
		provide: 'MONGO_CONNECTION',
		useFactory: async (): Promise<typeof mongoose> => {
			return await mongoose.connect('mongodb://localhost:27017/finlink');
		},
	},
];
