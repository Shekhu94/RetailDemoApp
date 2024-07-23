export interface VariantThumbnail {
  id: number;
  url: string;
}

export interface Option {
  id: string;
  size: string;
}

export interface Variant {
  id: string;
  images: string[];
  inventory_quantity: string;
  name: string;
  options: Option[];
  price: string;
  sku: string;
}

export interface ProductListModel {
  category: string;
  created_at: string;
  description: string;
  material: string;
  care: string;
  id: string;
  images: string[];
  inventory_quantity: string;
  name: string;
  price: string;
  sku: string;
  status: string;
  tags: string[];
  variants: Variant[];
  variants_thumbnail: VariantThumbnail[];
}

export interface SearchCriteriaModel {
  searchedText: string;
  selectedMenu: string;
}
