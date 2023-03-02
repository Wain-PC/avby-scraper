import { EModuleIds, TScrapedItem } from '../../def/module.js';

export function getTelegramAddedMessage(advert: TScrapedItem): string {
  return `
*${advert.title}, ${advert.year} г., пробег ${advert.mileage} км.,
${advert.price} ${advert.currency}
${advert.location}
${advert.url}*
${advert.description}`;
}
export function getTelegramSoldMessage(advert: TScrapedItem): string {
  return `
*[SOLD][${EModuleIds.AvBy}] ${advert.title}, ${advert.year} г., пробег ${advert.mileage} км.,
${advert.price} ${advert.currency}
${advert.location}
${advert.url}*`;
}
