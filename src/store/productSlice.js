import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  product: [
    {
      id: "01",
      Productname: "Buku",
      Productcategory: "Choose...",
      formFile: null,
      Additional: "",
      ProductFreshness: "Brand New",
      ProductPrice: "",
      imageSrc: null,
    },
  ],
};

const productSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.product = action.payload;
    },
    deleteProducts: (state, action) => {
      state.product = state.product.filter(
        (item) => item.id !== action.payload,
      );
    },
    editProducts: (state, action) => {
      const { id } = action.payload;
      const existingProductIndex = state.product.findIndex(
        (item) => item.id === id,
      );
      if (existingProductIndex !== -1) {
        state.product[existingProductIndex] = action.payload;
      }
    },
  },
});
export const { addProducts, deleteProducts, editProducts } =
  productSlice.actions;
export default productSlice.reducer;