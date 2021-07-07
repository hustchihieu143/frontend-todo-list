import { createAsyncThunk } from "@reduxjs/toolkit";
export const getProducts = createAsyncThunk(
    "/product/getProducts",
    async () => {
        return await fetch("http://localhost:2000/product").then((res) => {
            return res.json();
        });
    }
);

export const deleteProduct = createAsyncThunk(
    "/product/deleteProduct",
    async (id: number) => {
        return fetch(`http://localhost:2000/product/${id}`, {
            method: "DELETE",
        }).then((res) => {
            return res.json();
        });
    }
);

export const addProduct = createAsyncThunk(
    "/product/addProduct",
    async (data: any) => {
        let formData = new FormData();
        formData.append(data[0].name, data[1].name);
        formData.append(data[0].price, data[1].price);
        formData.append(data[0].quantity, data[1].quantity);
        formData.append(data[0].description, data[1].description);
        formData.append(data[0].category, data[1].category);
        formData.append(data[0].image, data[1].image);
        const response = await fetch(`http://localhost:2000/product`, {
            method: "POST",
            body: formData,
        });
        return response.json();
    }
);

export const updateProduct = createAsyncThunk(
    "/product/updateProduct",
    async (data: any[]) => {
        let formData = new FormData();
        formData.append(data[1].name, data[2].name);
        formData.append(data[1].price, data[2].price);
        formData.append(data[1].quantity, data[2].quantity);
        formData.append(data[1].description, data[2].description);
        formData.append(data[1].category, data[2].category);
        formData.append(data[1].image, data[2].image);
        const response = await fetch(
            `http://localhost:2000/product/${data[0].id}`,
            {
                method: "POST",
                body: formData,
            }
        );
        return response.json();
    }
);
