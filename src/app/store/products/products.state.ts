import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ProductListModel } from './products.model';
import { ProductListService } from '../../features/product-list/product-list.service';
import { GetProductList, GetProductListonSearch } from './products.action';

export class ProductListStateModel {
  productList: ProductListModel[] = [];
  searchedText: string = '';
}

@State<ProductListStateModel>({
  name: 'product',
  defaults: {
    productList: [],
    searchedText: '',
  },
})
@Injectable()
export class ProductListState {
  constructor(private productListService: ProductListService) {}
  //get the product list
  @Action(GetProductList) addProfile(ctx: StateContext<ProductListStateModel>) {
    const state = ctx.getState();
    this.productListService.getProductList().subscribe((payload) => {
      ctx.setState({ ...state, productList: payload });
    });
  }
  // set the searched text
  @Action(GetProductListonSearch) getProductListonSearch(
    ctx: StateContext<ProductListStateModel>,
    action: GetProductListonSearch
  ) {
    const state = ctx.getState();
    ctx.patchState({ ...state, searchedText: action.payload });
  }

  //select the product list from state based on searched text
  @Selector()
  static getProductList(state: ProductListStateModel) {
    const searchRegex = new RegExp(`(?<= |^)${state.searchedText}(?= |$)`, 'i');
    return state.productList.filter((x) => {
      if (state.searchedText.length == 0) {
        return x;
      } else {
        return x.description.match(searchRegex);
      }
    });
  }
}
