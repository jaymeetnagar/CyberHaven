import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody as Body,
    TableCell as Cell,
    TableContainer as Container,
    TableHead as Head,
    TableRow as Row,
    Paper,
    IconButton,
    TablePagination as Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ProductsTable.css";

const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetch("http://localhost:3001/product/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => response.json())
            .then((result) => setProducts(result.data));
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:3001/product/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => response.json())
            .then((result) => {
                alert("successfully deleted");
                setProducts(products.filter((product) => product._id !== id));
            });
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container className="table-container" component={Paper}>
            <Table>
                <Head>
                    <Row>
                        <Cell>No</Cell>
                        <Cell>Name</Cell>
                        <Cell>Price</Cell>
                        <Cell></Cell>
                    </Row>
                </Head>
                <Body>
                    {Array.isArray(products) &&
                        (rowsPerPage > 0
                            ? products.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : products
                        ).map((product, index) => (
                            <Row key={product._id}>
                                <Cell>{index + 1}</Cell>
                                <Cell>{product.title}</Cell>
                                <Cell>${product.price}</Cell>
                                <Cell>
                                    <IconButton
                                        color="primary"
                                        aria-label="edit"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            handleDelete(product._id);
                                        }}
                                        color="secondary"
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Cell>
                            </Row>
                        ))}
                </Body>
            </Table>
            <Pagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
    );
};

export default ProductsTable;
