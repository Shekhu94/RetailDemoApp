import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CartStateModel } from './cart.model';
import {
  ClearCartAfterSuccessfulOrder,
  DeleteSelectedProductFromCart,
  GetCart,
  SetSelectedProductInCart,
} from './cart.action';
import { Injectable } from '@angular/core';
import { CartService } from '../../pages/cart/cart.service';
import { LoggingService } from '../../shared/services/logging.service';

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    items: [],
    totalPrice: '',
  },
})
@Injectable()
export class CartState {
  constructor(
    private cartService: CartService,
    private loggingService: LoggingService
  ) {}
  // Actions will be defined here
  // set the selected prodcut in cart
  @Action(SetSelectedProductInCart) setSelectedProductInCart(
    ctx: StateContext<CartStateModel>,
    action: SetSelectedProductInCart
  ) {
    const state = ctx.getState();
    const existingItemIndex = state.items.findIndex(
      (item) => item.productId === action.payload.productId
    );

    if (existingItemIndex > -1) {
      // Update the existing item
      let existingItemQuantity = 0;
      existingItemQuantity =
        state.items.find((x) => x.productId === action.payload.productId)
          ?.quantity || 0;
      const updatedItems = state.items.map((item, index) =>
        index === existingItemIndex
          ? {
              ...item,
              quantity: action.payload.quantity + existingItemQuantity,
            }
          : item
      );
      ctx.patchState({ items: updatedItems });
    } else {
      // Add the new item
      ctx.patchState({ items: [...state.items, action.payload] });
    }
  }

  // get the selected product details
  @Action(GetCart) getCart(ctx: StateContext<CartStateModel>) {
    const state = ctx.getState();
    this.cartService.getCart().subscribe(
      (payload) => {
        ctx.setState({
          ...state,
          ...payload,
          totalPrice: payload.totalPrice,
        });
      },
      (err) => {
        this.loggingService.error('Error while making GET cart API call' + err);
      }
    );
  }

  @Action(DeleteSelectedProductFromCart) deleteSelectedProductFromCart(
    ctx: StateContext<CartStateModel>,
    action: DeleteSelectedProductFromCart
  ) {
    const state = ctx.getState();
    this.cartService.DeleteProductFromCart(action.id).subscribe(
      (payload) => {
        ctx.setState({
          ...state,
          items: payload.items,
          totalPrice: payload.totalPrice,
        });
      },
      (err) => {
        this.loggingService.error(
          'Error while deleting from cart API call' + err
        );
      }
    );
  }

  @Action(ClearCartAfterSuccessfulOrder) clearCartAfterSuccessfulOrder(
    ctx: StateContext<CartStateModel>
  ) {
    window.sessionStorage.clear(); // clearing cart state from session
    let initialState: CartStateModel = {
      items: [],
      totalPrice: '',
    };
    ctx.setState({
      ...initialState,
    });
  }

  @Selector()
  static getCart(state: CartStateModel) {
    return state;
  }

  @Selector()
  static getProductsInCartCount(state: CartStateModel) {
    let sum = state.items.reduce(
      (accumulator, value) => accumulator + value.quantity,
      0
    );
    return sum;
  }
}
