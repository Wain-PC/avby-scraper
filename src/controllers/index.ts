import { getAllRequests } from '../utils/requests.js';
import { getAllAdverts } from './list.js';
import { TRequestResult } from '../def/index.js';
import { loadRequestFromDB, saveRequestToDB } from './save.js';
import { differenceBy, isNil } from 'lodash-es';
import {
  sendNewAdvertToTelegram,
  sendNewRequestRegistered,
  sendSoldAdvertToTelegram,
} from './telegram.js';

export async function processCycle(): Promise<void> {
  console.debug(`Starting process cycle`);
  const requests = await getAllRequests();
  console.debug(`Found ${requests.length} requests in line`);

  for (const { listRequest, name } of requests) {
    console.debug(`[${name}] Processing request`);
    const adverts = await getAllAdverts(listRequest);
    const requestFromSite: TRequestResult = {
      name,
      adverts,
    };
    console.debug(`[${name}] Got ${adverts.length} adverts`);

    const requestFromDB = await loadRequestFromDB(name);

    if (isNil(requestFromDB)) {
      console.debug(
        `[${name}] DB Document not found, sending Telegram notification`,
      );
      await sendNewRequestRegistered(requestFromSite);
    } else {
      const soldItems = differenceBy(
        requestFromDB.adverts,
        requestFromSite.adverts,
        'id',
      );

      console.debug(`[${name}] Found ${soldItems.length} sold items`);
      for (const item of soldItems) {
        await sendSoldAdvertToTelegram(item);
      }

      const addedItems = differenceBy(
        requestFromSite.adverts,
        requestFromDB.adverts,
        'id',
      );

      console.debug(`[${name}] Found ${soldItems.length} new items`);
      for (const item of addedItems) {
        await sendNewAdvertToTelegram(item);
      }
    }

    await saveRequestToDB(requestFromSite);
    console.log('saved successfully');
  }
}
