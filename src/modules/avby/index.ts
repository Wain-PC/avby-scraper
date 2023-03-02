import { EModuleIds, TScraperModule } from '../../def/module.js';
import { getItems } from './request.js';

export const AvByModule: TScraperModule = {
  id: EModuleIds.AvBy,
  getItems,
};
