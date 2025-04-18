import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
	@Get('')
	getApiInfo() {
		return {
			message: 'API is working!',
			status: 'success',
		};
	}
}
