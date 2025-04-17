import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	private extractTokenFromHeader(req: Request): string | undefined {
		const [type, token] = req.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(req);
		if (!token) throw new UnauthorizedException('No token provided');

		try {
			const verifiedPayload = await this.jwtService.verifyAsync(token);
			req['user'] = verifiedPayload;
		} catch (error) {
			throw new UnauthorizedException('Invalid token');
		}

		return true;
	}
}
