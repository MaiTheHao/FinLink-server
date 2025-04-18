import mongoose from 'mongoose';
import { UserSchema } from 'src/entities/schemas/user.schema';
import { EmailVerificationSchema } from 'src/entities/schemas/email_verification.schema';
import { ResetPasswordSchema } from 'src/entities/schemas/reset_password.schema';

export const modelsProviders = [
	{
		provide: 'USER_MODEL',
		useFactory: (connection: mongoose.Connection) => connection.model('User', UserSchema),
		inject: ['MONGO_CONNECTION'],
	},
	{
		provide: 'EMAIL_VERIFICATION_MODEL',
		useFactory: (connection: mongoose.Connection) => connection.model('EmailVerification', EmailVerificationSchema),
		inject: ['MONGO_CONNECTION'],
	},
	{
		provide: 'RESET_PASSWORD_MODEL',
		useFactory: (connection: mongoose.Connection) => connection.model('ResetPassword', ResetPasswordSchema),
		inject: ['MONGO_CONNECTION'],
	},
];

/**
 * Mỗi inject tương ứng với mỗi param trong hàm useFactory
 * useFactory là một hàm factory, nó sẽ được gọi khi cần tạo ra một instance của provider
 * inject là một mảng các token mà Nest sẽ sử dụng để resolve các dependency cho hàm useFactory
 * Khi hàm useFactory được gọi, Nest sẽ tự động truyền vào các instance tương ứng với các token trong mảng inject
 * Trong trường hợp này, hàm useFactory sẽ nhận vào một instance của mongoose.Connection
 * Và trả về một model tương ứng với schema đã định nghĩa
 * Các model này sẽ được sử dụng trong các repository để thực hiện các thao tác với cơ sở dữ liệu MongoDB
 */
