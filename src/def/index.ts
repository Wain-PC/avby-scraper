type ListRequestPropertyValue = any;

type ListRequestProperty = {
  name: string;
  property?: number;
  value: ListRequestPropertyValue;
};

export type TPrice = {
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

export type TAdvert = {
  id: number;
  type: EAdvertType;
  description: string;
  locationName: string;
  metadata: {
    year: number;
  };
  originalDaysOnSale: number;
  price: {
    byn: TPrice;
    usd: TPrice;
    rub: TPrice;
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
  adverts: TAdvert[];
};

export type TRequestName = string;

export type TRequestResult = {
  name: TRequestName;
  adverts: TAdvert[];
};

export type TRequestFile = {
  name: TRequestName;
  listRequest: ListRequest;
};
