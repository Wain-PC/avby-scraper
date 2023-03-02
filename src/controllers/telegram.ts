import TelegramBot, { InputMedia } from 'node-telegram-bot-api';
import { config } from '../utils/config.js';
import { EModuleIds, TScrapedItem, TScraperResponse } from '../def/module.js';
import { TRequestName } from '../def/index.js';

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

export async function sendNewRequestRegistered(
  id: EModuleIds,
  name: TRequestName,
  res: TScraperResponse,
): Promise<void> {
  const text = `Зарегистрирован новый запрос *[${id}]${name}*.
Первым поиском найдено ${res.items.length} объявлений`;

  await bot.sendMessage(config.telegramChatId, text, {
    parse_mode: 'Markdown',
  });
}

export async function sendNewAdvertToTelegram(
  advert: TScrapedItem,
  text: string,
): Promise<void> {
  const media: InputMedia[] = advert.photos.slice(0, 10).map((media) => {
    return {
      type: 'photo',
      media,
    };
  });

  if (media.length > 0) {
    await bot.sendMediaGroup(config.telegramChatId, media, {
      disable_notification: true,
    });
  }

  await bot.sendMessage(config.telegramChatId, text, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  });
}

export async function sendSoldAdvertToTelegram(text: string): Promise<void> {
  await bot.sendMessage(config.telegramChatId, text, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  });
}
