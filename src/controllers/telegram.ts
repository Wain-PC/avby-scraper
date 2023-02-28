import TelegramBot, { InputMedia } from 'node-telegram-bot-api';
import { config } from '../utils/config.js';
import { TAdvert, TRequestResult } from '../def/index.js';
import { getAdvertProperty } from '../utils/getAdvertProperty.js';

const bot = new TelegramBot(config.telegramToken, { polling: true });

bot.onText(/\/start/, async (msg) => {
  if (msg.chat.id === Number(config.telegramChatId)) {
    await bot.sendMessage(
      config.telegramChatId,
      'Chat registered successfully',
    );
    return;
  }
  await bot.sendMessage(
    config.telegramChatId,
    `Unknown chat id ${msg.chat.id}`,
  );
});

console.log(config);

export async function sendNewRequestRegistered(
  req: TRequestResult,
): Promise<void> {
  const text = `Зарегистрирован новый запрос *${req.name}*.
Первым поиском найдено ${req.adverts.length} объявлений`;

  await bot.sendMessage(config.telegramChatId, text, {
    parse_mode: 'Markdown',
  });
}

export async function sendNewAdvertToTelegram(advert: TAdvert): Promise<void> {
  const media: InputMedia[] = advert.photos.slice(0, 10).map((photo) => {
    return {
      type: 'photo',
      media: photo.big.url,
    };
  });

  await bot.sendMediaGroup(config.telegramChatId, media, {
    disable_notification: true,
  });

  const text = `
*${getAdvertProperty(advert, 'brand')} ${getAdvertProperty(advert, 'model')}, ${
    advert.year
  } г., пробег ${getAdvertProperty(advert, 'mileage_km')} км,
${advert.price.usd.amount} ${advert.price.usd.currency}
${advert.locationName}
${advert.publicUrl}*
${advert.description}`;

  await bot.sendMessage(config.telegramChatId, text, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  });
}

export async function sendSoldAdvertToTelegram(advert: TAdvert): Promise<void> {
  const text = `
*[SOLD] ${getAdvertProperty(advert, 'brand')} ${getAdvertProperty(
    advert,
    'model',
  )}, ${advert.year} г., пробег ${getAdvertProperty(advert, 'mileage_km')} км,
${advert.price.usd.amount} ${advert.price.usd.currency}
${advert.locationName}
${advert.publicUrl}*`;

  await bot.sendMessage(config.telegramChatId, text, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  });
}
