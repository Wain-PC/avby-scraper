import * as dotenv from 'dotenv';

type TConfig = {
  port: number;
  baseURLAvBy: string;
  baseURLAvito: string;
  mongoURL: string;
  userAgent: string;
  waitBetweenRequests: number;
  waitBetweenRequestsAvito: number;
  requestsDir: string;
  telegramToken: string;
  telegramChatId: string;
  cron: string;
};

dotenv.config();
const config = (await import('config')).default as unknown as TConfig;

export { config };
