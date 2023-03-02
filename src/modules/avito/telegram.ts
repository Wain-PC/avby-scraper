import { EModuleIds, TScrapedItem } from '../../def/module.js';

export function getTelegramAddedMessage(advert: TScrapedItem): string {
  return `
*[${EModuleIds.Avito}] ${advert.title}
${advert.price} ${advert.currency}
${advert.location}
${advert.url}*
${advert.description}`;
}
export function getTelegramSoldMessage(advert: TScrapedItem): string {
  return `
*[SOLD][${EModuleIds.Avito}] ${advert.title},
${advert.price} ${advert.currency}
${advert.location}
${advert.url}*`;
}
