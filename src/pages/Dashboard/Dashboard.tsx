import { useEffect, useState } from "react";
import { Table, Button, Form, Col } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { MdKeyboardBackspace } from "react-icons/md";
import CreateProduct from "../../components/CreateProduct";
import UpdateProduct from "../../components/UpdateProduct";
import {
    showCreateForm,
    showEditForm,
    onChangeElement,
} from "../../features/product/product.slice";
import { getProducts } from "../../features/product/apis";
import { deleteProduct } from "../../features/product/apis";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

function Dashboard() {
    const [textOfInputSearch, setTextOfInputSearch] = useState("");
    const showedCreate = useAppSelector(
        (state: any) => state.product.showedCreate
    );
    const { products } = useAppSelector((state: any) => state.product);
    const { changedStateProducts } = useAppSelector(
        (state: any) => state.product
    );
    const showedEdit = useAppSelector((state: any) => state.product.showedEdit);
    const dispatch = useAppDispatch();

    const handleShowFormCreate = (isShow: boolean) => {
        dispatch(
            onChangeElement({
                key: "nameProduct",
                value: "",
            })
        );
        dispatch(
            onChangeElement({
                key: "description",
                value: "",
            })
        );
        dispatch(
            onChangeElement({
                key: "price",
                value: 0,
            })
        );
        dispatch(
            onChangeElement({
                key: "quantity",
                value: 0,
            })
        );
        dispatch(
            onChangeElement({
                key: "selectedFile",
                value: "",
            })
        );
        dispatch(
            onChangeElement({
                key: "category",
                value: "",
            })
        );
        dispatch(showCreateForm(isShow));
    };

    useEffect(() => {
        dispatch(getProducts());
    }, [changedStateProducts]);

    const handleDelete = (id: number) => {
        dispatch(deleteProduct(id));
    };

    const showFormEdit = async (
        id: any,
        name: any,
        description: any,
        price: any,
        quantity: any,
        image: any,
        category: any
    ) => {
        dispatch(
            onChangeElement({
                key: "nameProduct",
                value: name,
            })
        );

        dispatch(
            onChangeElement({
                key: "description",
                value: description,
            })
        );

        dispatch(
            onChangeElement({
                key: "price",
                value: price,
            })
        );

        dispatch(
            onChangeElement({
                key: "quantity",
                value: quantity,
            })
        );
        dispatch(
            onChangeElement({
                key: "selectedFile",
                value: image,
            })
        );

        dispatch(
            onChangeElement({
                key: "category",
                value: category,
            })
        );

        dispatch(showEditForm(true));

        dispatch(
            onChangeElement({
                key: "id",
                value: id,
            })
        );
    };

    const handleBack = () => {
        dispatch(showEditForm(false));
        dispatch(showCreateForm(false));
    };

    const showedTable = !showedCreate && !showedEdit;
    const showedBack = showedCreate || showedEdit;

    let filterProduct;
    if (products) {
        filterProduct = products.filter((element: any) => {
            return element.name
                .toUpperCase()
                .includes(textOfInputSearch.toUpperCase());
        });
    }

    return (
        <div>
            <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
                Dashboard
            </h1>
            <div className="search" style={{ marginLeft: "43%" }}>
                <Form>
                    <Form.Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" srOnly>
                                Name
                            </Form.Label>
                            <Form.Control
                                className="mb-2"
                                id="inlineFormInput"
                                placeholder="Input name product"
                                value={textOfInputSearch}
                                onChange={(e) => {
                                    setTextOfInputSearch(e.target.value);
                                }}
                            />
                        </Col>
                    </Form.Row>
                </Form>
            </div>
            {showedTable && (
                <button
                    style={{ marginBottom: "20px", marginLeft: "45%" }}
                    onClick={() => handleShowFormCreate(true)}
                >
                    Thêm sản phẩm
                </button>
            )}
            <br />
            {showedBack && (
                <Button
                    style={{ marginLeft: "30%" }}
                    onClick={() => handleBack()}
                >
                    <MdKeyboardBackspace />
                </Button>
            )}

            {showedCreate && <CreateProduct />}

            {showedEdit && <UpdateProduct />}

            {showedTable && (
                <Table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterProduct &&
                            filterProduct.map((product: any) => (
                                <tr key={product.id}>
                                    <td>
                                        <img
                                            src={
                                                "http://localhost:2000/product/public/" +
                                                product.image
                                            }
                                            alt="Product"
                                            style={{
                                                width: "100px",
                                            }}
                                        />
                                    </td>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price} $</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <button
                                            style={{
                                                marginRight: "5px",
                                            }}
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                        >
                                            <AiFillDelete />
                                        </button>
                                        <button
                                            onClick={() =>
                                                showFormEdit(
                                                    product.id,
                                                    product.name,
                                                    product.description,
                                                    product.price,
                                                    product.quantity,
                                                    product.image,
                                                    product.category
                                                )
                                            }
                                        >
                                            <GrEdit />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}
export default Dashboard;
