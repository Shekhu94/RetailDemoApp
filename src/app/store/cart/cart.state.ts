import { State, Action, StateContext } from '@ngxs/store';
import { CartStateModel } from './cart.model';

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    items: [],
  },
})
export class CartState {
  // Actions will be defined here
}
