import { model, Schema } from 'mongoose';
import type {
  TAdvert,
  TAdvertPhoto,
  TAdvertPhotoSize,
  TAdvertPrice,
  TAdvertProperty,
  TRequestResult,
} from '../def/index.js';

const priceSchema = new Schema<TAdvertPrice>({
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
});

const propertySchema = new Schema<TAdvertProperty>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
});

const photoSizeSchema = new Schema<TAdvertPhotoSize>({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  url: { type: String, required: true },
});

const photoSchema = new Schema<TAdvertPhoto>({
  id: { type: Number, required: true },
  main: { type: Boolean, required: true },
  extrasmall: photoSizeSchema,
  small: photoSizeSchema,
  medium: photoSizeSchema,
  big: photoSizeSchema,
});

const advertSchema = new Schema<TAdvert>({
  id: { type: Number, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  locationName: { type: String, required: true },
  metadata: {
    year: { type: Number, required: true },
  },
  originalDaysOnSale: { type: Number, required: true },
  price: {
    byn: priceSchema,
    usd: priceSchema,
    rub: priceSchema,
  },
  publicUrl: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  refreshedAt: { type: Date, required: true },
  renewedAt: { type: Date, required: true },
  year: { type: Number, required: true },
  properties: [propertySchema],
  photos: [photoSchema],
});

const requestSchema = new Schema<TRequestResult>({
  name: { type: String, required: true },
  adverts: [advertSchema],
});

export const Request = model('request', requestSchema);
