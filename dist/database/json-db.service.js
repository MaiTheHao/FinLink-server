"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonDbService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs/promises");
const lodash_1 = require("lodash");
let JsonDbService = class JsonDbService {
    getFilePath(collection) {
        return path.join(process.cwd(), 'data', `${collection}.json`);
    }
    async createCollection(collection, data = []) {
        const filePath = this.getFilePath(collection);
        try {
            const dir = path.dirname(filePath);
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        }
        catch (error) {
            console.error(`Error creating collection ${collection}:`, error);
            throw error;
        }
    }
    async saveData(collection, data) {
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
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                await this.createCollection(collection, data);
            }
            else {
                console.error(`Error saving data to collection ${collection}:`, error);
                throw error;
            }
        }
    }
    async findAll(collection) {
        try {
            const data = await fs.readFile(this.getFilePath(collection), 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error(`Error reading data from collection ${collection}:`, error);
            if (error.code === 'ENOENT') {
                await this.createCollection(collection);
            }
            return [];
        }
    }
    async findById(collection, _id) {
        const items = await this.findAll(collection);
        return items.find((item) => item._id === _id);
    }
    async insertOne(collection, data) {
        try {
            if (!data)
                throw new Error('Data is required to insert into the collection.');
            if (!data._id)
                throw new Error('ID is required to insert into the collection.');
            const items = await this.findAll(collection);
            const newData = (0, lodash_1.cloneDeep)(data);
            const createdAt = new Date().toISOString();
            newData.createdAt = createdAt;
            newData.updatedAt = createdAt;
            items.push(newData);
            await this.saveData(collection, items);
            return newData;
        }
        catch (error) {
            console.error(`Error inserting data into collection ${collection}:`, error);
            throw error;
        }
    }
    async updateOne(collection, _id, data) {
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
        }
        catch (error) {
            console.error(`Error updating data in collection ${collection}:`, error);
            throw error;
        }
    }
    async deleteOne(collection, _id) {
        try {
            if (!_id)
                throw new Error('ID is required to delete from the collection.');
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
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                await this.createCollection(collection);
                return false;
            }
            console.error(`Error deleting data from collection ${collection}:`, error);
            throw error;
        }
    }
    async findByField(collection, field, value) {
        const items = await this.findAll(collection);
        return items.find((item) => item[field] === value);
    }
    async findAllByField(collection, field, value) {
        const items = await this.findAll(collection);
        return items.filter((item) => item[field] === value);
    }
    async countDocuments(collection) {
        const items = await this.findAll(collection);
        return items.length;
    }
    async exists(collection, query) {
        const items = await this.findAll(collection);
        return items.some((item) => {
            return Object.entries(query).every(([key, value]) => item[key] === value);
        });
    }
    async clear(collection) {
        try {
            await this.saveData(collection, []);
        }
        catch (error) {
            console.error(`Error clearing data from collection ${collection}:`, error);
            throw error;
        }
    }
};
exports.JsonDbService = JsonDbService;
exports.JsonDbService = JsonDbService = __decorate([
    (0, common_1.Injectable)()
], JsonDbService);
//# sourceMappingURL=json-db.service.js.map