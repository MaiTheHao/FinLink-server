import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches } from 'class-validator';
import {
	AuthValidationMessages,
	UserValidationMessages,
} from '../../../../../common/constants/validation-messages.constant';

export class RegisterDto {
	@IsNotEmpty({ message: AuthValidationMessages.EMAIL_REQUIRED })
	@IsEmail({}, { message: AuthValidationMessages.EMAIL_VALID })
	email: string;

	@IsNotEmpty({ message: AuthValidationMessages.PASSWORD_REQUIRED })
	@IsString({ message: AuthValidationMessages.PASSWORD_STRING })
	@IsStrongPassword(
		{ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
		{ message: AuthValidationMessages.PASSWORD_PATTERN }
	)
	password: string;

	@IsNotEmpty({ message: AuthValidationMessages.PASSWORD_CONFIRM_REQUIRED })
	confirmPassword: string;

	@IsNotEmpty({ message: UserValidationMessages.USERNAME_REQUIRED })
	@IsString({ message: UserValidationMessages.USERNAME_STRING })
	@Matches(/^[A-Za-z\s]+$/, { message: 'Tên chỉ được chứa các ký tự chữ cái' }) // Chưa thấy có sẵn nên giữ nguyên
	username: string;
}
