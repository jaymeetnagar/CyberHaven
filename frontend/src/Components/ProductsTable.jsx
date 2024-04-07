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
import { Link } from "react-router-dom";

const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {

        fetch("http://localhost:3001/product/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => response.json())
            .then((result) => setProducts(result.data));

    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleDelete = (id) => {


        // confirm delete or exit
        if (window.confirm("Please Confirm Delete?") == false) {
            return;
        }
        
        fetch(`http://localhost:3001/product/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
        .then((response) => response.json())
        .then((result) => {

            alert("Product Deleted Successfully");


        });


    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container className="table-container" component={Paper}>
            <Table class="table table-striped">
                <Head>
                    <Row>
                        <Cell>Sr.No</Cell>
                        <Cell>Image</Cell>
                        <Cell>Name</Cell>
                        <Cell>Price</Cell>
                        <Cell>Category</Cell>
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
                                <Cell>
                                    <img src={product.imageURL} alt={product.title} style={{ width: 100 }} />
                                </Cell>
                                <Cell>{product.title}</Cell>
                                <Cell><strong>$</strong>{product.price}</Cell>
                                <Cell>
                                    <span className="badge bg-info text-body">{product.category}</span>
                                </Cell>
                                <Cell>
                                    <Link to={`/admin/edit-product/${product._id}`}>
                                    <IconButton 
                                        color="primary"
                                        aria-label="edit"
                                    >
                                        <EditIcon />
                                        
                                    </IconButton>
                                    </Link>
                                    
                                    <IconButton onClick={() => { handleDelete(product._id); }}
                                        color="error"
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
