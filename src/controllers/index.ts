import { getAllRequests } from '../utils/requests.js';
import { loadRequestFromDB, saveRequestToDB } from './save.js';
import { differenceBy, isNil } from 'lodash-es';
import {
  sendNewAdvertToTelegram,
  sendNewRequestRegistered,
  sendSoldAdvertToTelegram,
} from './telegram.js';
import { EModuleIds, TScraperModule } from '../def/module.js';
import { AvByModule } from '../modules/avby/index.js';
import { AvitoModule } from '../modules/avito/index.js';

export async function processCycle(): Promise<void> {
  console.debug(`Starting process cycle`);
  const requests = await getAllRequests();
  console.debug(`Found ${requests.length} requests in line`);

  for (const { moduleId, request, name } of requests) {
    console.debug(`[${moduleId}][${name}] Processing request`);
    if (moduleId === undefined) {
      console.error(`Incorrect request ${name} (moduleId is undefined)`);
      continue;
    }

    const module = selectModuleById(moduleId);
    if (module === undefined) {
      console.error(`Incorrect request ${name} (module ${moduleId} not found)`);
      continue;
    }

    try {
      const siteItem = await module.getItems(request);
      console.debug(
        `[${moduleId}][${name}] Got ${siteItem.items.length} adverts`,
      );

      const dbItem = await loadRequestFromDB(name);
      await saveRequestToDB(moduleId, name, siteItem);
      console.log('[${moduleId}][${name}] DB Document upserted');

      if (isNil(dbItem)) {
        console.debug(
          `[${moduleId}][${name}] DB Document not found, sending Telegram notification`,
        );
        await sendNewRequestRegistered(moduleId, name, siteItem);
      } else {
        const soldItems = differenceBy(dbItem.items, siteItem.items, 'id');

        console.debug(
          `[${moduleId}][${name}] Found ${soldItems.length} sold items`,
        );
        for (const item of soldItems) {
          await sendSoldAdvertToTelegram(module.getTelegramSoldMessage(item));
        }

        const addedItems = differenceBy(siteItem.items, dbItem.items, 'id');

        console.debug(
          `[${moduleId}][${name}] Found ${soldItems.length} new items`,
        );
        for (const item of addedItems) {
          await sendNewAdvertToTelegram(
            item,
            module.getTelegramAddedMessage(item),
          );
        }
      }
    } catch (e) {
      console.error(`${moduleId}][${name}] Failed to process request:`, e);
    }
  }
}

function selectModuleById(id: EModuleIds): TScraperModule | undefined {
  switch (id) {
    case EModuleIds.AvBy: {
      return AvByModule;
    }
    case EModuleIds.Avito: {
      return AvitoModule;
    }
    default: {
      return undefined;
    }
  }
}
