import { firstValueFrom, from, map, switchMap } from 'rxjs';
import fetch from 'node-fetch';
import { config } from '../../utils/config.js';
import wait from 'wait-promise';
import { ListResponse, TAvByAdvert, TAvByListRequest } from './def.js';
import { TScrapedItem, TScraperResponse } from '../../def/module.js';
import { getAdvertProperty } from './utils.js';

export function makeListRequest(
  request: TAvByListRequest,
  pageCount?: number,
): Promise<ListResponse> {
  console.log(`Make request for page ${request.page}/${pageCount ?? '?'}`);

  return firstValueFrom(
    from(
      fetch(`${config.baseURL}/offer-types/cars/filters/main/apply`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json',
          Apply: 'application/json',
          'User-Agent': config.userAgent,
        },
      }),
    ).pipe(
      switchMap((res) => res.json()),
      map((data) => data as ListResponse),
    ),
  );
}

export async function getInternalItems(
  request: TAvByListRequest,
): Promise<TAvByAdvert[]> {
  const resFirstPage = await makeListRequest({ ...request, page: 1 });
  let adverts = resFirstPage.adverts;

  const { page, pageCount } = resFirstPage;

  for (let currentPage = page + 1; currentPage <= pageCount; currentPage++) {
    await wait.sleep(config.waitBetweenRequests);
    const res = await makeListRequest(
      { ...request, page: currentPage },
      pageCount,
    );
    adverts = adverts.concat(res.adverts);
  }

  return adverts;
}

export async function getItems(
  request: TAvByListRequest,
): Promise<TScraperResponse> {
  const internalItems = await getInternalItems(request);
  const items: TScrapedItem[] = internalItems.map((item) => ({
    id: item.id,
    title: `${getAdvertProperty(item, 'brand')} ${getAdvertProperty(
      item,
      'model',
    )}`,
    year: item.year,
    location: item.locationName,
    mileage: +getAdvertProperty(item, 'mileage_km'),
    price: item.price.usd.amount,
    currency: item.price.usd.currency,
    photos: item.photos.map((photo) => photo.big.url),
    description: item.description,
    url: item.publicUrl,
  }));

  return { items };
}
