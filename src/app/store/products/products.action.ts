export class GetProductList {
  static readonly type = '[ProductList page] GetProduct';
}

export class GetProductListonSearch {
  static readonly type = '[ProductList page] GetProductOnSearch';
  constructor(public payload: string) {}
}
