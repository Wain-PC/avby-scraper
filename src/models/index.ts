import { model, Schema } from 'mongoose';
import { TDatabaseItem } from '../def/index.js';
import { TScrapedItem } from '../def/module.js';

const advertSchema = new Schema<TScrapedItem>({
  id: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  url: { type: String, required: true },
  photos: [{ type: String, required: true }],
});

const itemSchema = new Schema<TDatabaseItem>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  items: [advertSchema],
});

export const Item = model('item', itemSchema);
