import { Injectable } from '@nestjs/common';
import { DatabaseInterface } from 'src/database/database.interface';
import { JsonDbService } from 'src/database/json-db.service';

@Injectable()
export class BaseRepository<T extends { id: string }> {
	protected db: DatabaseInterface;
	protected collection: string;

	constructor(
		protected jsonDbService: JsonDbService,
		collection: string
	) {
		this.collection = collection;
	}

	protected async findAll(): Promise<T[]> {
		return this.jsonDbService.findAll(this.collection);
	}

	protected async findById(id: string): Promise<T | null> {
		return this.jsonDbService.findById(this.collection, id);
	}

	protected async findByField(field: keyof T, value: any): Promise<T | null> {
		const items = await this.findAll();
		return items.find((item) => item[field] === value) || null;
	}

	protected async findAllByField(field: keyof T, value: any): Promise<T[]> {
		const items = await this.findAll();
		return items.filter((item) => item[field] === value);
	}

	protected async create(data: Partial<T>): Promise<T> {
		return this.jsonDbService.insertOne(this.collection, data);
	}

	protected async update(id: string, data: Partial<T>): Promise<T> {
		return this.jsonDbService.updateOne(this.collection, id, data);
	}

	protected async deleteById(id: string): Promise<boolean> {
		return this.jsonDbService.deleteOne(this.collection, id);
	}

	protected async deleteByField(field: keyof T, value: any): Promise<boolean> {
		const entity = await this.findByField(field, value);
		if (!entity || !('id' in entity)) return false;
		return this.deleteById(entity['id'] as unknown as string);
	}
}
