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
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  categories: Category[];
  created_at: string;
  description: string;
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
