import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/product.slice";
import categoryReducer from "../features/category/category.slice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
//Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
