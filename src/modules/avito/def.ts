export type TAvitoRequest = string;

export type TAvitoResponse = {
  status: string;
  result: {
    totalCount: number;
    nextPageId: string;
    items: TAvitoItem[];
  };
};

export type TAvitoItem = {
  type: string;
  value: {
    id: number;
    address: string;
    location: string;
    title: string;
    uri_mweb: string;
    price: string;
    galleryItems?: TAvitoGalleryItem[];
  };
};

export type TAvitoGalleryItem = {
  type: string;
  value: Record<string, string>;
};
