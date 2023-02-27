import {
  ADD_TO_CART,
  CART_RESET,
  REMOVE_FROM_CART,
  CART_ORDER_REQUEST,
  CART_ORDER_SUCCESS,
  CART_ORDER_FAIL,
  CART_ORDER_RESET,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_RESET:
      return {
        ...state,
        cartItems: [],
      };
    case CART_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CART_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      };
    case CART_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CART_ORDER_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        order: null,
      };
    default:
      return state;
  }
};
