import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, deleteProduct, updateProduct, addProduct } from "./apis";
const initialState = {
    currentProduct: {
        id: "",
        nameProduct: "",
        price: 0,
        quantity: 0,
        category: "",
        description: "",
        selectedFile: "",
    },
    showedCreate: false,
    showedEdit: false,
    changedStateProducts: false,
    products: [],
    status: false,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        showCreateForm: (state: any, action: PayloadAction<boolean>) => {
            return {
                ...state,
                showedCreate: action.payload,
            };
        },
        showEditForm: (state: any, action: PayloadAction<boolean>) => {
            return {
                ...state,
                showedEdit: action.payload,
            };
        },
        onChangeElement: (state: any, action: any) => {
            const key = action.payload.key;
            const value = action.payload.value;
            state.currentProduct[key] = value;
            return state;
        },
        changeStateProducts: (state: any, action: PayloadAction<boolean>) => {
            return {
                ...state,
                changedStateProducts: action.payload,
            };
        },
    },
    extraReducers: {
        [`${getProducts.pending}`]: (state, action) => {
            state.status = true;
        },
        [`${getProducts.fulfilled}`]: (state, action) => {
            state.products = action.payload;
            state.status = false;
        },
        [`${getProducts.rejected}`]: (state, action) => {
            state.status = false;
        },
        [`${deleteProduct.pending}`]: (state, action) => {
            state.status = true;
        },
        [`${deleteProduct.fulfilled}`]: (state, action) => {
            state.changedStateProducts = !state.changedStateProducts;
        },
        [`${deleteProduct.rejected}`]: (state, action) => {
            state.status = false;
        },
        [`${addProduct.pending}`]: (state, action) => {
            state.status = true;
        },
        [`${addProduct.fulfilled}`]: (state, action) => {
            state.changedStateProducts = !state.changedStateProducts;
        },
        [`${addProduct.rejected}`]: (state, action) => {
            state.status = true;
        },
        [`${updateProduct.pending}`]: (state, action) => {
            state.status = true;
        },
        [`${updateProduct.fulfilled}`]: (state, action) => {
            state.changedStateProducts = !state.changedStateProducts;
        },
        [`${updateProduct.rejected}`]: (state, action) => {
            state.status = true;
        },
    },
});

export const {
    showCreateForm,
    onChangeElement,
    showEditForm,
    changeStateProducts,
} = productSlice.actions;

const { reducer: productReducer } = productSlice;

export default productReducer;
