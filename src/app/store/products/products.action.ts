import { SearchCriteriaModel } from './products.model';

export class GetProductList {
  static readonly type = '[ProductList page] GetProduct';
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

export class SetSelectedProduct {
  static readonly type = '[ProductDetail page] SetSelectedProduct';
  constructor(public id: number) {}
}
