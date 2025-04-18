import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { AuthValidationMessages, PasswordMessages } from '../../../../../common/constants/validation_messages.constant';

export class ResetPasswordDto {
	@IsNotEmpty({ message: AuthValidationMessages.EMAIL_REQUIRED })
	@IsEmail({}, { message: AuthValidationMessages.EMAIL_VALID })
	email: string;

	@IsNotEmpty({ message: PasswordMessages.PASSWORD_NEW_REQUIRED })
	@IsString({ message: PasswordMessages.PASSWORD_NEW_STRING })
	@IsStrongPassword(
		{ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
		{ message: PasswordMessages.PASSWORD_NEW_PATTERN }
	)
	newPassword: string;

	@IsNotEmpty({ message: PasswordMessages.PASSWORD_CONFIRM_REQUIRED })
	confirmPassword: string;
}
