import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(products) &&
                        (rowsPerPage > 0
                            ? products.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : products
                        ).map((product, index) => (
                            <TableRow key={product._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
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
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default ProductsTable;
