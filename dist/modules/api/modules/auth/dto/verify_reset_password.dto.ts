import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { AuthValidationMessages, TokenMessages } from '../../../../../common/constants/validation_messages.constant';

export class VerifyResetPasswordDto {
	@IsNotEmpty({ message: AuthValidationMessages.EMAIL_REQUIRED })
	@IsEmail({}, { message: AuthValidationMessages.EMAIL_VALID })
	email: string;

	@IsNotEmpty({ message: TokenMessages.TOKEN_REQUIRED })
	@IsString({ message: TokenMessages.TOKEN_STRING })
	token: string;
}
