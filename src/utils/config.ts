import * as dotenv from 'dotenv';

type TConfig = {
  port: number;
  baseURL: string;
  mongoURL: string;
  userAgent: string;
  waitBetweenRequests: number;
  requestsDir: string;
  telegramToken: string;
  telegramChatId: string;
};

dotenv.config();
const config = (await import('config')).default as unknown as TConfig;

export { config };
