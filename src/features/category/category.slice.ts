import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
    id: number;
    name: string;
}

const initialState = {
    currentCategory: {
        id: "",
        name: "",
    },
    categories: [],
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        getCategories: (state: any, action: PayloadAction<Category>) => {
            return {
                ...state,
                categories: action.payload,
            };
        },
    },
});

export const { getCategories } = categorySlice.actions;

const { reducer: categoryReducer } = categorySlice;

export default categoryReducer;
