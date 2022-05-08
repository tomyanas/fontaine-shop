/* eslint-disable prettier/prettier */
/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
import {
  createSlice,
  PayloadAction
  // current
} from '@reduxjs/toolkit';
import { IProduct } from 'Redux/Interfaces';

interface ICartProduct {
  product: IProduct;
  quantity: number;
}
interface IProductState {
  allProducts: IProduct[];
  filteredProducts: IProduct[];
  listedProducts: IProduct[];
  searchedProducts: IProduct[];
  cartProducts: ICartProduct[];
  quantityCart: number;
  isSeasrching: boolean;
  filterActive: boolean;
  productById: IProduct | null;
  categoryFilter: string[];
}

const initialState: IProductState = {
  cartProducts: [],
  quantityCart: 0,
  allProducts: [],
  isSeasrching: false,
  filterActive: false,
  searchedProducts: [],
  listedProducts: [],
  filteredProducts: [],
  categoryFilter: [],
  productById: null
};
export const productSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {
    // Esto es una action
    setProductList: (state, action: PayloadAction<IProduct[]>) => {
      state.allProducts = action.payload;
      state.listedProducts = action.payload;
    },
    addProductCart: (state, action: PayloadAction<IProduct>) => {
      state.quantityCart += 1;
      const isInCart = state.cartProducts.find(
        (item) => item.product.productId === action.payload.productId
      );
      state.cartProducts = isInCart
        ? state.cartProducts.map((item) =>
          item.product.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item)
        : [...state.cartProducts, { product: action.payload, quantity: 1 }];
    },

    removeOneProductFromCart: (state, action: PayloadAction<IProduct>) => {
      const isInCart = state.cartProducts.find(
        (item) => item.product.productId === action.payload.productId
      );
      state.quantityCart -= 1;
      if (isInCart) {
        state.cartProducts = isInCart.quantity > 1
          ? state.cartProducts.map((item) =>
            item.product.productId === action.payload.productId
              ? { ...item, quantity: item.quantity - 1 }
              : item)
          : state.cartProducts = state.cartProducts.filter(
            (item) => item.product.productId !== action.payload.productId
          );
      }
    },
    removeProductFromCart: (state, action: PayloadAction<IProduct>) => {
      const isInCart = state.cartProducts.find(
        (item) => item.product.productId === action.payload.productId
      );
      state.quantityCart -= isInCart?.quantity || 0;
      state.cartProducts = state.cartProducts.filter(
        (item) => item.product.productId !== action.payload.productId
      );
    },
    clearCart: (state) => {
      state.quantityCart = 0;
      state.cartProducts = [];
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      state.isSeasrching = action.payload.length > 0;
      // console.log(action.payload);
      state.searchedProducts = state.allProducts.filter((product: IProduct) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase()));
      state.listedProducts = [...state.searchedProducts];
    },

    getOneProduct: (state, action: PayloadAction<IProduct>) => {
      state.productById = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<IProduct>) => {
      state.productById = action.payload;
    }
  }
});

export const {
  setProductList,
  searchProducts,
  addProductCart,
  removeOneProductFromCart,
  removeProductFromCart,
  clearCart
} = productSlice.actions;

export default productSlice;
