import { model, Schema } from 'mongoose';
import type { TPrice, TAdvert, TRequestResult } from '../def/index.js';

const priceSchema = new Schema<TPrice>({
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
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
});

const requestSchema = new Schema<TRequestResult>({
  name: { type: String, required: true },
  adverts: [advertSchema],
});

export const Request = model('request', requestSchema);
