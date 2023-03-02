export enum EModuleIds {
  AvBy = 'AvBy',
  AutoRu = 'AutoRu',
  Avito = 'Avito',
}

export type TScraperId = EModuleIds;

export type TScrapedItem = {
  id: number;
  title: string;
  year?: number;
  mileage?: number;
  location: string;
  price: number;
  currency?: string;
  photos: string[];
  url: string;
  description: string;
};

export type TScraperResponse = {
  items: TScrapedItem[];
};

export type TScraperModule = {
  id: TScraperId;
  getItems: (request: any) => Promise<TScraperResponse>;
  getTelegramAddedMessage: (item: TScrapedItem) => string;
  getTelegramSoldMessage: (item: TScrapedItem) => string;
};
