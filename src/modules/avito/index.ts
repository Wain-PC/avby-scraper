import { EModuleIds, TScraperModule } from '../../def/module.js';
import { getItems } from './request.js';
import { getTelegramAddedMessage, getTelegramSoldMessage } from './telegram.js';

export const AvitoModule: TScraperModule = {
  id: EModuleIds.Avito,
  getItems,
  getTelegramAddedMessage,
  getTelegramSoldMessage,
};
