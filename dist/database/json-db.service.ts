import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import { DatabaseInterface } from './database.interface';
import { cloneDeep } from 'lodash';

@Injectable()
export class JsonDbService implements DatabaseInterface {
	private getFilePath(collection: string): string {
		return path.join(process.cwd(), 'data', `${collection}.json`);
	}

	private async createCollection(collection: string, data: any = []): Promise<void> {
		const filePath = this.getFilePath(collection);
		try {
			const dir = path.dirname(filePath);
			await fs.mkdir(dir, { recursive: true });

			await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
		} catch (error) {
			console.error(`Error creating collection ${collection}:`, error);
			throw error;
		}
	}

	private async saveData(collection: string, data: any): Promise<void> {
		try {
			if (Array.isArray(data)) {
				const idCounts = new Map();
				for (const item of data) {
					if (item._id) {
						idCounts.set(item._id, (idCounts.get(item._id) || 0) + 1);
					}
				}

				const duplicates = [...idCounts.entries()].filter(([_, count]) => count > 1).map(([_id]) => _id);

				if (duplicates.length > 0) {
					console.warn(`Warning: Duplicate IDs found in ${collection}: ${duplicates.join(', ')}`);
				}
			}

			await fs.writeFile(this.getFilePath(collection), JSON.stringify(data, null, 2), 'utf-8');
		} catch (error) {
			if (error.code === 'ENOENT') {
				await this.createCollection(collection, data);
			} else {
				console.error(`Error saving data to collection ${collection}:`, error);
				throw error;
			}
		}
	}

	async findAll(collection: string): Promise<any[]> {
		try {
			const data = await fs.readFile(this.getFilePath(collection), 'utf-8');
			return JSON.parse(data);
		} catch (error) {
			console.error(`Error reading data from collection ${collection}:`, error);
			if (error.code === 'ENOENT') {
				await this.createCollection(collection);
			}
			return [];
		}
	}

	async findById(collection: string, _id: string): Promise<any> {
		const items = await this.findAll(collection);
		return items.find((item) => item._id === _id);
	}

	async insertOne(collection: string, data: any): Promise<any> {
		try {
			if (!data) throw new Error('Data is required to insert into the collection.');
			if (!data._id) throw new Error('ID is required to insert into the collection.');

			const items = await this.findAll(collection);

			const newData = cloneDeep(data);

			const createdAt = new Date().toISOString();
			newData.createdAt = createdAt;
			newData.updatedAt = createdAt;

			items.push(newData);
			await this.saveData(collection, items);

			return newData;
		} catch (error) {
			console.error(`Error inserting data into collection ${collection}:`, error);
			throw error;
		}
	}

	async updateOne(collection: string, _id: string, data: any): Promise<any> {
		try {
			const items = await this.findAll(collection);
			const index = items.findIndex((item) => item._id === _id);
			if (index === -1) {
				throw new Error(`Item with _id ${_id} not found in collection ${collection}.`);
			}
			const updatedData = { ...items[index], ...data, updatedAt: new Date().toISOString() };
			items[index] = updatedData;
			await this.saveData(collection, items);
			return updatedData;
		} catch (error) {
			console.error(`Error updating data in collection ${collection}:`, error);
			throw error;
		}
	}

	async deleteOne(collection: string, _id: string): Promise<boolean> {
		try {
			if (!_id) throw new Error('ID is required to delete from the collection.');
			const items = await this.findAll(collection);

			if (!items || items.length === 0) {
				console.warn(`No items found in collection ${collection}. Nothing to delete.`);
				return false;
			}

			const index = items.findIndex((item) => item._id === _id);

			if (index === -1) {
				console.warn(`Item with _id ${_id} not found in collection ${collection}. Nothing to delete.`);
				return false;
			}
			items.splice(index, 1);

			await this.saveData(collection, items);
			return true;
		} catch (error) {
			if (error.code === 'ENOENT') {
				await this.createCollection(collection);
				return false;
			}
			console.error(`Error deleting data from collection ${collection}:`, error);
			throw error;
		}
	}

	async findByField(collection: string, field: string, value: any): Promise<any> {
		const items = await this.findAll(collection);
		return items.find((item) => item[field] === value);
	}

	async findAllByField(collection: string, field: string, value: any): Promise<any[]> {
		const items = await this.findAll(collection);
		return items.filter((item) => item[field] === value);
	}

	async countDocuments(collection: string): Promise<number> {
		const items = await this.findAll(collection);
		return items.length;
	}

	async exists(collection: string, query: Record<string, any>): Promise<boolean> {
		const items = await this.findAll(collection);
		return items.some((item) => {
			return Object.entries(query).every(([key, value]) => item[key] === value);
		});
	}

	async clear(collection: string): Promise<void> {
		try {
			await this.saveData(collection, []);
		} catch (error) {
			console.error(`Error clearing data from collection ${collection}:`, error);
			throw error;
		}
	}
}
