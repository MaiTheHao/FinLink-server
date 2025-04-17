import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
	/**
	 * Move all request handling logic into separate modules under the 'api' route.
	 * This controller acts as a parent route only.
	 */
	@Get('')
	getApiInfo() {
		return {
			message: 'API is working!',
			status: 'success',
		};
	}
}
