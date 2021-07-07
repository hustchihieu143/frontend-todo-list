import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getCategories } from "../../features/category/category.slice";
import {
    onChangeElement,
    showCreateForm,
    showEditForm,
} from "../../features/product/product.slice";
import { addProduct, updateProduct } from "../../features/product/apis";

import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

const FormInput = () => {
    const { showedCreate, showedEdit } = useAppSelector(
        (state: any) => state.product
    );
    const { categories } = useAppSelector((state: any) => state.category);
    const {
        id,
        nameProduct,
        price,
        quantity,
        description,
        category,
        selectedFile,
    } = useAppSelector((state: any) => state.product.currentProduct);

    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const requestUrl = "http://localhost:2000/category";
                const res = await fetch(requestUrl);
                const resJSON = await res.json();
                const data = resJSON;
                const action = getCategories(data);
                dispatch(action);
            } catch (e) {
                console.log(e.message);
            }
        }

        fetchCategories();
    }, []);

    const onChangeName = (e: any) => {
        const key = "nameProduct";
        const value = e.target.value;
        const action = onChangeElement({
            key: key,
            value: value,
        });
        dispatch(action);
    };

    const onChangePrice = (e: any) => {
        const key = "price";
        const value = e.target.value;
        const action = onChangeElement({
            key: key,
            value: value,
        });
        dispatch(action);
    };
    const onChangeCategory = async (e: any) => {
        const key = "category";
        const value = e.target.value;
        const action = onChangeElement({
            key: key,
            value: value,
        });
        dispatch(action);
    };
    const onChangeQuantity = (e: any) => {
        const key = "quantity";
        const value = e.target.value;
        const action = onChangeElement({
            key: key,
            value: value,
        });
        dispatch(action);
    };
    const onChangeDescription = (e: any) => {
        const key = "description";
        const value = e.target.value;
        const action = onChangeElement({
            key: key,
            value: value,
        });
        dispatch(action);
    };
    const onChangeFile = (e: any) => {
        const key = "selectedFile";
        const value = e.target.files[0];
        const action = onChangeElement({
            key: key,
            value: value,
        });
        dispatch(action);
    };

    const handleCreateProduct = (e: any) => {
        e.preventDefault();
        const data = [
            {
                name: "name",
                price: "price",
                quantity: "quantity",
                description: "description",
                category: "category",
                image: "image",
            },
            {
                name: nameProduct,
                price: price,
                quantity: quantity,
                description: description,
                category: category,
                image: selectedFile,
            },
        ];
        dispatch(addProduct(data));
        dispatch(showCreateForm(false));
    };

    const handleUpdateProduct = (e: any) => {
        e.preventDefault();
        const data: any = [
            { id: id },
            {
                name: "name",
                price: "price",
                quantity: "quantity",
                description: "description",
                category: "category",
                image: "image",
            },
            {
                name: nameProduct,
                price: price,
                quantity: quantity,
                description: description,
                category: category,
                image: selectedFile,
            },
        ];
        dispatch(updateProduct(data));
        dispatch(showEditForm(false));
    };

    return (
        <>
            <div
                className="add-product"
                style={{
                    border: "1px solid black",
                    padding: "30px",
                    width: "40%",
                    marginLeft: "30%",
                }}
            >
                <Form>
                    <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={nameProduct}
                            onChange={onChangeName}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Price"
                            value={price}
                            onChange={onChangePrice}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            className="mr-sm-2"
                            id="inlineFormCustomSelect"
                            value={category}
                            onChange={onChangeCategory}
                        >
                            <option value="Choose category">
                                Choose category
                            </option>
                            {categories.length > 0 &&
                                categories.map((category: any) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="text"
                            value={quantity}
                            onChange={onChangeQuantity}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={onChangeDescription}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.File
                            id="exampleFormControlFile1"
                            name="productPictures"
                            onChange={onChangeFile}
                        />
                    </Form.Group>
                    {showedCreate && (
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleCreateProduct}
                        >
                            Submit
                        </Button>
                    )}
                    {showedEdit && (
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleUpdateProduct}
                        >
                            Update
                        </Button>
                    )}
                </Form>
            </div>
        </>
    );
};

export default FormInput;
