import { Injectable, Logger } from '@nestjs/common';
import { JsonLogRepository } from 'src/repositories/json/json-log.repository';

@Injectable()
export class LogService {
	private readonly logger = new Logger(LogService.name);

	constructor(private readonly jsonLogRepository: JsonLogRepository) {}

	async logInfo(message: string, ...optionalParams: any[]): Promise<void> {
		await this.jsonLogRepository.logInfo(message, ...optionalParams);
		this.logger.log(`\x1b[32m${message}\x1b[0m`, ...optionalParams);
	}

	async logWarn(message: string, ...optionalParams: any[]): Promise<void> {
		await this.jsonLogRepository.logWarn(message, ...optionalParams);
		this.logger.warn(`\x1b[33m${message}\x1b[0m`, ...optionalParams);
	}

	async logError(message: string, ...optionalParams: any[]): Promise<void> {
		await this.jsonLogRepository.logError(message, ...optionalParams);
		this.logger.error(`\x1b[31m${message}\x1b[0m`, ...optionalParams);
	}

	private getMethodColor(method: string): string {
		switch (method.toUpperCase()) {
			case 'GET':
				return '\x1b[32m';
			case 'POST':
				return '\x1b[34m';
			case 'PUT':
				return '\x1b[33m';
			case 'DELETE':
				return '\x1b[31m';
			default:
				return '\x1b[36m';
		}
	}

	private getMethodMessage(method: string): string {
		switch (method.toUpperCase()) {
			case 'GET':
				return 'Yêu cầu đọc dữ liệu';
			case 'POST':
				return 'Yêu cầu tạo dữ liệu mới';
			case 'PUT':
				return 'Yêu cầu cập nhật dữ liệu';
			case 'DELETE':
				return 'Yêu cầu xóa dữ liệu';
			default:
				return 'Yêu cầu';
		}
	}

	async logRequest(method: string, path: string, body?: any): Promise<void> {
		await this.jsonLogRepository.logRequest(method, path, body);

		const color = this.getMethodColor(method);
		const methodMsg = this.getMethodMessage(method);

		this.logger.log(`${color}${methodMsg}: ${method} ${path}\x1b[0m`);

		if (body && Object.keys(body).length > 0) {
			this.logger.debug(`\x1b[36mDữ liệu gửi lên:\x1b[0m ${JSON.stringify(body)}`);
		}
	}

	async getAllLogs() {
		return this.jsonLogRepository.getAllLogs();
	}

	async getLogsByLevel(level: string) {
		return this.jsonLogRepository.getLogsByLevel(level as any);
	}

	async getLogsByDateRange(from: Date, to: Date) {
		return this.jsonLogRepository.getLogsByDateRange(from, to);
	}

	async searchLogs(keyword: string) {
		return this.jsonLogRepository.searchLogs(keyword);
	}

	async clearLogs() {
		await this.jsonLogRepository.clearLogs();
	}
}
