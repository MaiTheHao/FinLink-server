export interface LogEntry {
	_id: string;
	level: 'info' | 'warn' | 'error' | 'request';
	message: string;
	optionalParams?: any[];
	method?: string;
	path?: string;
	body?: any;
	createdAt: string;
}
