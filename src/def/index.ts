import { EModuleIds, TScrapedItem } from './module.js';
import { InputMedia } from 'node-telegram-bot-api';

export type TRequestName = string;

export type TRequestFile = {
  moduleId: EModuleIds | undefined;
  name: TRequestName;
  request: any | undefined;
};

export type TDatabaseItem = {
  id: EModuleIds;
  name: TRequestName;
  items: TScrapedItem[];
};

export type TTelegramAddedMessage = {
  text: string;
  media?: InputMedia[];
};

export type TTelegramSoldMessage = {
  text: string;
  media?: InputMedia[];
};
