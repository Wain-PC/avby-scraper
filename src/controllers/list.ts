import { ListRequest, ListResponse } from '../def/index.js';
import { config } from '../utils/config.js';
import { firstValueFrom, from, map, switchMap } from 'rxjs';
import fetch from 'node-fetch';

export function makeListRequest(request: ListRequest): Promise<ListResponse> {
  return firstValueFrom(
    from(
      fetch(`${config.baseURL}/offer-types/cars/filters/main/apply`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json',
          Apply: 'application/json',
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        },
      }),
    ).pipe(
      switchMap((res) => res.json()),
      map((data) => {
        // TODO Parse dates and all other conversion stuff here
        return data as ListResponse;
      }),
    ),
  );
}
