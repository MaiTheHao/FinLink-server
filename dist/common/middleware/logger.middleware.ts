import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	// Định nghĩa các mã màu
	private readonly colors = {
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

	use(req: Request, res: Response, next: NextFunction) {
		const { method, path } = req;

		// Phân biệt các loại method và màu tương ứng
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

		// Log thông tin request với màu sắc
		console.log(
			`${this.colors.magenta}[${new Date().toLocaleString('vi-VN')}]${this.colors.reset} ${color}${methodMsg}: ${method} ${path}${this.colors.reset}`
		);

		// Log body nếu có
		if (req.body && Object.keys(req.body).length > 0) {
			console.log(`${this.colors.cyan}Dữ liệu gửi lên:${this.colors.reset}`, req.body);
		}

		// Cảnh báo khi truy cập vào root path
		if (path === '/') {
			console.warn(
				`${this.colors.bgRed}${this.colors.bright}⚠️ CẢNH BÁO NGHIÊM TRỌNG: Có người đang truy cập vào đường dẫn gốc (root path)! ⚠️${this.colors.reset}`
			);
		}

		next();
	}
}
