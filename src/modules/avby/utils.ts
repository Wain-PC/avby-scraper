import { TAdvertProperty, TAvByAdvert } from './def.js';

export function getAdvertProperty(
  advert: TAvByAdvert,
  name: TAdvertProperty['name'],
): TAdvertProperty['value'] | null {
  const prop = advert.properties.find((prop) => prop.name === name);
  return prop.value ?? null;
}
