import c from 'config';

type TConfig = {
  port: number;
  baseURL: string;
  mongoURL: string;
  userAgent: string;
  waitBetweenRequests: number;
  requestsDir: string;
};

const config: TConfig = c;

export { config };
