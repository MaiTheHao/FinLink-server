import { Controller, Get, Put, Body, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(AuthGuard)
	@Get('profile')
	async getProfile(@Request() req) {
		return this.userService.findById(req.user.sub);
	}

	@UseGuards(AuthGuard)
	@Put('profile')
	async updateProfile(@Request() req, @Body() updateData: any) {
		return this.userService.updateProfile(req.user.sub, updateData);
	}

	@Get(':id')
	async getUserById(@Param('id') id: string) {
		return this.userService.findById(id);
	}

	@UseGuards(AuthGuard)
	@Get('email/:email')
	async findByEmail(@Param('email') email: string) {
		return this.userService.findByEmail(email);
	}
}
