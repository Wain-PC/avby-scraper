import {
  EModuleIds,
  TScrapedItem,
  TScraperResponse,
} from '../../def/module.js';
import { TAvitoItem, TAvitoRequest, TAvitoResponse } from './def.js';
import qs from 'qs';
import { firstValueFrom, from, map, switchMap } from 'rxjs';
import fetch from 'node-fetch';
import { config } from '../../utils/config.js';
import wait from 'wait-promise';
import { findBestImage } from './utils.js';

export async function getInternalItems(
  request: TAvitoRequest,
): Promise<TAvitoItem[]> {
  // Add `lastStamp (1677665760) & page for first page.
  // For next pages add `pageId` from prev request
  const lastStamp = Math.round(new Date().getTime() / 1000);
  let page = 1;
  let resItems: TAvitoItem[] = [];
  let pageId: string | undefined = undefined;

  while (true) {
    try {
      if (page > 1) {
        await wait.sleep(config.waitBetweenRequestsAvito);
      }
      const response = await makeRequest(request, page, lastStamp, pageId);
      if (response.status !== 'ok') {
        console.error(
          `[${EModuleIds.Avito}] Request status is not OK`,
          response,
        );
        break;
      }

      const { items, nextPageId, totalCount } = response.result;

      console.debug(
        `[${EModuleIds.Avito}][Page ${page}] Received ${items.length} of ${totalCount}`,
      );

      if (items.length === 0) {
        break;
      }

      resItems = resItems.concat(items.filter((item) => item.type === 'item'));

      if (!nextPageId) {
        break;
      }

      pageId = nextPageId;
      page++;
    } catch (e) {
      console.error(`[${EModuleIds.Avito}] Request failed`, e);
      throw e;
    }
  }

  return resItems;
}

export async function getItems(
  request: TAvitoRequest,
): Promise<TScraperResponse> {
  const originalItems = await getInternalItems(request);
  const items: TScrapedItem[] = originalItems.map((item) => ({
    id: item.value.id,
    title: item.value.title,
    location: `${item.value.location} ${item.value.address}`.trim(),
    price: parseInt(item.value.price?.replace(/\D/g, ''), 10),
    currency: 'руб.',
    url: `${config.baseURLAvito}${item.value.uri_mweb}`,
    photos:
      item.value.galleryItems
        ?.filter((item) => item.type === 'photo')
        .map((item) => findBestImage(item))
        .filter((url) => url) ?? [],
    description: '',
  }));
  return { items };
}

function makeRequest(
  request: TAvitoRequest,
  page: number,
  lastStamp: number,
  pageId: string | undefined,
): Promise<TAvitoResponse> {
  const queryObj = {
    ...qs.parse(request),
    page,
    lastStamp,
    pageId,
  };
  const query = qs.stringify(queryObj);
  const url = `${config.baseURLAvito}/api/11/items/?${query}`;

  console.log(`[${EModuleIds.Avito}] Making request to ${url}, query:`, query);

  return firstValueFrom(
    from(
      fetch(url, {
        method: 'GET',
        headers: {
          // TODO: Add `f` (and, probably, other) cookie(s) from the original request
          referer: 'https://m.avito.ru/moskva_i_mo/avtomobili/s_probegom',
          'content-type': 'application/json;charset=utf-8',
          accept: 'application/json',
          'user-agent': config.userAgent,
          'x-laas-timezone': 'Europe/Moscow',
        },
      }),
    ).pipe(
      switchMap((res) => res.json()),
      map((data) => data as TAvitoResponse),
    ),
  );
}
