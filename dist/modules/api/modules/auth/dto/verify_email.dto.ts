import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AuthValidationMessages, TokenMessages } from '../../../../../common/constants/validation-messages.constant';

export class VerifyEmailDto {
	@IsNotEmpty({ message: AuthValidationMessages.EMAIL_REQUIRED })
	@IsEmail({}, { message: AuthValidationMessages.EMAIL_VALID })
	email: string;

	@IsNotEmpty({ message: TokenMessages.TOKEN_REQUIRED })
	@IsString({ message: TokenMessages.TOKEN_STRING })
	token: string;
}
