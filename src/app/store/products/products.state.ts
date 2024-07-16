import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ProductListModel } from './products.model';
import { ProductListService } from '../../pages/product/product-list.service';
import {
  GetProductList,
  GetProductListonMenu,
  GetProductListonSearch,
} from './products.action';

export class ProductListStateModel {
  productList: ProductListModel[] = [];
  filteredProductList: ProductListModel[] = [];
  searchedText: string = '';
  selectedMenu: string = '';
}

@State<ProductListStateModel>({
  name: 'product',
  defaults: {
    productList: [],
    filteredProductList: [],
    searchedText: '',
    selectedMenu: '',
  },
})
@Injectable()
export class ProductListState {
  constructor(private productListService: ProductListService) {}
  //get the product list
  @Action(GetProductList) addProfile(ctx: StateContext<ProductListStateModel>) {
    const state = ctx.getState();
    this.productListService.getProductList().subscribe((payload) => {
      ctx.setState({
        ...state,
        productList: payload,
        filteredProductList: payload,
      });
    });
  }
  // set the searched text
  @Action(GetProductListonSearch) getProductListonSearch(
    ctx: StateContext<ProductListStateModel>,
    action: GetProductListonSearch
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      searchedText: action.payload.searchedText,
      selectedMenu: action.payload.selectedMenu,
    });
  }

  // set the searched menu
  @Action(GetProductListonMenu) getProductListonMenu(
    ctx: StateContext<ProductListStateModel>,
    action: GetProductListonMenu
  ) {
    const state = ctx.getState();
    let a = state.productList.filter(
      (x) => x.category === action.payload.selectedMenu
    );
    ctx.setState({
      ...state,
      filteredProductList: a,
      searchedText: '',
      selectedMenu: action.payload.selectedMenu,
    });
  }

  //select the product list from state based on searched text
  @Selector()
  static getProductList(state: ProductListStateModel) {
    const searchTextRegex = new RegExp(
      `(?<= |^)${state.searchedText}(?= |$)`,
      'i'
    );

    return state.filteredProductList.filter((x) => {
      if (state.searchedText.length == 0) {
        return x;
      } else {
        return x.description.match(searchTextRegex);
      }
    });
  }
}
