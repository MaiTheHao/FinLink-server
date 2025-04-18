import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { AuthValidationMessages } from '../../../../../common/constants/validation_messages.constant';

export class LoginDto {
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

	@IsOptional()
	@IsBoolean({ message: 'Giá trị không hợp lệ' }) // Chưa thấy có sẵn trong constants nên giữ nguyên
	rememberMe: boolean;
}
