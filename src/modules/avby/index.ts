import { EModuleIds, TScraperModule } from '../../def/module.js';
import { getItems } from './request.js';
import { getTelegramAddedMessage, getTelegramSoldMessage } from './telegram.js';

export const AvByModule: TScraperModule = {
  id: EModuleIds.AvBy,
  getItems,
  getTelegramAddedMessage,
  getTelegramSoldMessage,
};
