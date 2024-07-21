import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CartStateModel } from './cart.model';
import { SetSelectedProductInCart } from './cart.action';
import { Injectable } from '@angular/core';

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    items: [],
  },
})
@Injectable()
export class CartState {
  // Actions will be defined here
  // set the searched text
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

  @Selector()
  static getProductsInCartCount(state: CartStateModel) {
    let sum = state.items.reduce(
      (accumulator, value) => accumulator + value.quantity,
      0
    );
    return sum;
  }
}
