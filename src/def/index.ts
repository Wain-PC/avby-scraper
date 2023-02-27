type ListRequestPropertyValue = any;

type ListRequestProperty = {
  name: string;
  property?: number;
  value: ListRequestPropertyValue;
};

type Price = {
  currency: string;
  amount: number;
};

export type ListRequest = {
  page: number;
  properties: ListRequestProperty[];
};

export enum EAdvertType {
  Cars = 'cars',
}

export type Advert = {
  id: number;
  type: EAdvertType;
  description: string;
  locationName: string;
  metadata: {
    year: number;
  };
  originalDaysOnSale: number;
  price: {
    byn: Price;
    usd: Price;
    rub: Price;
  };
  publicUrl: string;
  publishedAt: Date;
  refreshedAt: Date;
  renewedAt: Date;
  year: number;
};

export type ListResponse = {
  advertsPerPage: number;
  count: number;
  page: number;
  pageCount: number;
  adverts: Advert[];
};
