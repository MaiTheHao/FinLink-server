import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Hello World!</title>
    <style>
      body {
      min-height: 100vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f6f8fb;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
      }
      .card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 4px 24px rgba(60, 72, 88, 0.10);
      padding: 2.5rem 2rem;
      text-align: center;
      max-width: 360px;
      width: 90vw;
      transition: box-shadow 0.2s;
      }
      .card:hover {
      box-shadow: 0 8px 32px rgba(60, 72, 88, 0.18);
      }
      h1 {
      font-size: 2.1rem;
      color: #2d3748;
      font-weight: 700;
      margin-bottom: 0.6em;
      letter-spacing: 1px;
      }
      p {
      color: #6b7280;
      font-size: 1.08rem;
      margin-top: 0;
      }
      @media (max-width: 500px) {
      .card {
        padding: 1.5rem 0.5rem;
        width: 98vw;
      }
      h1 {
        font-size: 1.5rem;
      }
      }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Inter:400,700&display=swap" rel="stylesheet">
    </head>
    <body>
    <div class="card">
      <h1>Hello, World!</h1>
      <p>Welcome to FinLink.</p>
    </div>
    </body>
    </html>
  `;
	}
}
