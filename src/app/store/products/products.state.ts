import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ProductListModel, Option } from './products.model';
import { ProductService } from '../../pages/product/product.service';
import {
  GetProductDetails,
  GetProductList,
  GetProductListonMenu,
  GetProductListonSearch,
  SetSelectedProductSize,
} from './products.action';

export class ProductListStateModel {
  productList: ProductListModel[] = [];
  productDetails: ProductListModel[] = [];
  filteredProductList: ProductListModel[] = [];
  searchedText: string = '';
  selectedMenu: string = '';
  selectedSize: Option[] = [];
}

@State<ProductListStateModel>({
  name: 'product',
  defaults: {
    productList: [],
    productDetails: [],
    filteredProductList: [],
    searchedText: '',
    selectedMenu: '',
    selectedSize: [],
  },
})
@Injectable()
export class ProductListState {
  constructor(private productListService: ProductService) {}
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

  // get the selected product details
  @Action(GetProductDetails) GetProductDetails(
    ctx: StateContext<ProductListStateModel>,
    action: GetProductDetails
  ) {
    const state = ctx.getState();
    this.productListService
      .getProductDetails(action.id)
      .subscribe((payload) => {
        ctx.setState({
          ...state,
          productDetails: payload,
        });
      });
  }

  // set the selected product details
  @Action(SetSelectedProductSize) SetSelectedProductSize(
    ctx: StateContext<ProductListStateModel>,
    action: SetSelectedProductSize
  ) {
    const state = ctx.getState();
    let selectedSize: Option[] = [];
    selectedSize.push(action.size);
    ctx.patchState({
      ...state,
      selectedSize: selectedSize,
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

  //select the product list from state based on searched text
  @Selector()
  static getProductDetails(state: ProductListStateModel) {
    return state.productDetails;
  }

  //select the product size from state
  @Selector()
  static getProductSize(state: ProductListStateModel) {
    return state.selectedSize;
  }
}
