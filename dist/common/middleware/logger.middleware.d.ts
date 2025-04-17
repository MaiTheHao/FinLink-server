import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
export declare class LoggerMiddleware implements NestMiddleware {
    private readonly colors;
    use(req: Request, res: Response, next: NextFunction): void;
}
