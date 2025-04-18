import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { JsonDbService } from 'src/database/json-db.service';
import { LogEntry } from 'src/entities/interfaces/log.interface';

@Injectable()
export class JsonLogRepository extends BaseRepository<LogEntry> {
	constructor(protected jsonDbService: JsonDbService) {
		super(jsonDbService, 'logs');
	}

	private generateId(): string {
		return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}

	private createLogEntry(
		level: LogEntry['level'],
		message: string,
		extra: Partial<LogEntry> = {},
		optionalParams?: any[]
	): LogEntry {
		return {
			_id: this.generateId(),
			level,
			message,
			optionalParams: optionalParams ?? [],
			createdAt: new Date().toISOString(),
			...extra,
		};
	}

	async logInfo(message: string, ...optionalParams: any[]): Promise<LogEntry> {
		const entry = this.createLogEntry('info', message, {}, optionalParams);
		return this.create(entry);
	}

	async logWarn(message: string, ...optionalParams: any[]): Promise<LogEntry> {
		const entry = this.createLogEntry('warn', message, {}, optionalParams);
		return this.create(entry);
	}

	async logError(message: string, ...optionalParams: any[]): Promise<LogEntry> {
		const entry = this.createLogEntry('error', message, {}, optionalParams);
		return this.create(entry);
	}

	async logRequest(method: string, path: string, body?: any): Promise<LogEntry> {
		const entry = this.createLogEntry('request', `${method} ${path}`, { method, path, body });
		return this.create(entry);
	}

	async getAllLogs(): Promise<LogEntry[]> {
		return this.findAll();
	}

	async getLogsByLevel(level: LogEntry['level']): Promise<LogEntry[]> {
		const logs = await this.findAll();
		return logs.filter((log) => log.level === level);
	}

	async getLogsByDateRange(from: Date, to: Date): Promise<LogEntry[]> {
		const logs = await this.findAll();
		return logs.filter((log) => {
			const createdAt = new Date(log.createdAt);
			return createdAt >= from && createdAt <= to;
		});
	}

	async searchLogs(keyword: string): Promise<LogEntry[]> {
		const logs = await this.findAll();
		return logs.filter(
			(log) =>
				log.message.toLowerCase().includes(keyword.toLowerCase()) ||
				(log.optionalParams && JSON.stringify(log.optionalParams).toLowerCase().includes(keyword.toLowerCase()))
		);
	}

	async clearLogs(): Promise<void> {
		await this.jsonDbService.clear('logs');
	}
}
