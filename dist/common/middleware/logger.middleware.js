"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
let LoggerMiddleware = class LoggerMiddleware {
    colors = {
        reset: '\x1b[0m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        bgRed: '\x1b[41m',
        bright: '\x1b[1m',
    };
    use(req, res, next) {
        const { method, path } = req;
        let methodMsg = '';
        let color = this.colors.reset;
        switch (method) {
            case 'GET':
                methodMsg = 'Yêu cầu đọc dữ liệu';
                color = this.colors.green;
                break;
            case 'POST':
                methodMsg = 'Yêu cầu tạo dữ liệu mới';
                color = this.colors.blue;
                break;
            case 'PUT':
                methodMsg = 'Yêu cầu cập nhật dữ liệu';
                color = this.colors.yellow;
                break;
            case 'DELETE':
                methodMsg = 'Yêu cầu xóa dữ liệu';
                color = this.colors.red;
                break;
            default:
                methodMsg = 'Yêu cầu';
                color = this.colors.cyan;
        }
        console.log(`${this.colors.magenta}[${new Date().toLocaleString('vi-VN')}]${this.colors.reset} ${color}${methodMsg}: ${method} ${path}${this.colors.reset}`);
        if (req.body && Object.keys(req.body).length > 0) {
            console.log(`${this.colors.cyan}Dữ liệu gửi lên:${this.colors.reset}`, req.body);
        }
        if (path === '/') {
            console.warn(`${this.colors.bgRed}${this.colors.bright}⚠️ CẢNH BÁO NGHIÊM TRỌNG: Có người đang truy cập vào đường dẫn gốc (root path)! ⚠️${this.colors.reset}`);
        }
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map