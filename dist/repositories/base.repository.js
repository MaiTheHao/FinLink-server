"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const common_1 = require("@nestjs/common");
const json_db_service_1 = require("../database/json-db.service");
let BaseRepository = class BaseRepository {
    jsonDbService;
    db;
    collection;
    constructor(jsonDbService, collection) {
        this.jsonDbService = jsonDbService;
        this.collection = collection;
    }
    async findAll() {
        return this.jsonDbService.findAll(this.collection);
    }
    async findById(id) {
        return this.jsonDbService.findById(this.collection, id);
    }
    async findByField(field, value) {
        const items = await this.findAll();
        return items.find((item) => item[field] === value) || null;
    }
    async findAllByField(field, value) {
        const items = await this.findAll();
        return items.filter((item) => item[field] === value);
    }
    async create(data) {
        return this.jsonDbService.insertOne(this.collection, data);
    }
    async update(id, data) {
        return this.jsonDbService.updateOne(this.collection, id, data);
    }
    async deleteById(id) {
        return this.jsonDbService.deleteOne(this.collection, id);
    }
    async deleteByField(field, value) {
        const entity = await this.findByField(field, value);
        if (!entity || !('id' in entity))
            return false;
        return this.deleteById(entity['id']);
    }
};
exports.BaseRepository = BaseRepository;
exports.BaseRepository = BaseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [json_db_service_1.JsonDbService, String])
], BaseRepository);
//# sourceMappingURL=base.repository.js.map