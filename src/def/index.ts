type ListRequestPropertyValue = any;

type ListRequestProperty = {
  name: string;
  property?: number;
  value: ListRequestPropertyValue;
};

export type TAdvertPrice = {
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

export type TAdvertPhoto = {
  id: number;
  main?: boolean;
  extrasmall: TAdvertPhotoSize;
  small: TAdvertPhotoSize;
  medium?: TAdvertPhotoSize;
  big: TAdvertPhotoSize;
};
export type TAdvertPhotoSize = {
  width: number;
  height: number;
  url: string;
};

export type TAdvertProperty = {
  name: string;
  value: string | number;
  id: number;
};

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
    byn: TAdvertPrice;
    usd: TAdvertPrice;
    rub: TAdvertPrice;
  };
  publicUrl: string;
  publishedAt: Date;
  refreshedAt: Date;
  renewedAt: Date;
  year: number;
  photos: TAdvertPhoto[];
  properties: TAdvertProperty[];
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
