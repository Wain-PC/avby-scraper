import { TAdvert, TAdvertProperty } from '../def/index.js';

export function getAdvertProperty(
  advert: TAdvert,
  name: TAdvertProperty['name'],
): TAdvertProperty['value'] | null {
  const prop = advert.properties.find((prop) => prop.name === name);
  return prop.value ?? null;
}
