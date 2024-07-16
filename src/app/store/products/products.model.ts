export interface Image {
  id: string;
  url: string;
}

export interface Option {
  id: string;
  name: string;
  value: string;
}

export interface Variant {
  id: string;
  images: Image[];
  inventory_quantity: string;
  name: string;
  options: Option[];
  price: string;
  sku: string;
  weight: string;
  weight_unit: string;
  sizes: string[];
}

export interface ProductListModel {
  category: string;
  created_at: string;
  description: string;
  material: string;
  care: string;
  id: string;
  images: Image[];
  inventory_quantity: string;
  name: string;
  options: Option[];
  price: string;
  sku: string;
  status: string;
  tags: string[];
  variants: Variant[];
}

export interface SearchCriteriaModel {
  searchedText: string;
  selectedMenu: string;
}
