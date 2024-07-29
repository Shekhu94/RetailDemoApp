import { Option, SearchCriteriaModel } from './products.model';

export class GetProductList {
  static readonly type = '[ProductList page] GetProduct';
  constructor(public category: string) {}
}

export class GetProductListonSearch {
  static readonly type = '[ProductList page] GetProductOnSearch';
  constructor(public payload: SearchCriteriaModel) {}
}

export class GetProductListonMenu {
  static readonly type = '[ProductList page] GetProductOnMenu';
  constructor(public payload: SearchCriteriaModel) {}
}

export class GetProductDetails {
  static readonly type = '[ProductDetail page] GetProductDetails';
  constructor(public id: string) {}
}

export class SetSelectedProductSize {
  static readonly type = '[ProductDetail page] SetSelectedProductSize';
  constructor(public size: Option) {}
}
