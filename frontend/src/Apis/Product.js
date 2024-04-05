
/**
 * 
 * @returns {Promise} Promise object represents the list of all products
 */
const getAllProducts = async () => {
    try {
        const result = await fetch("http://localhost:3001/product/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const response = await result.json();
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

/**
 * 
 * @param {string} productId
 * @returns {Promise} Promise object represents a product by id
 */
const getProductById = async (productId) => {
    try {
        const result = await fetch("http://localhost:3001/product/" + productId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const response = await result.json();
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

/**
 * POST request to update a product
 * @param {Object} newProduct
 * @param {string} newProduct._id
 * @param {string} [newProduct.title]
 * @param {string} [newProduct.description]
 * @param {string} [newProduct.price]
 * @param {string} [newProduct.imageURL]
 * @param {string} [newProduct.type]
 * @param {string} [newProduct.category]
 * @param {string} [newProduct.deal]
 * @param {string} [newProduct.dealPrice]
 * @returns {Promise} Promise object represents the updated product
 */
const updateProduct = async (newProduct) => {
    try {
        const result = await fetch("http://localhost:3001/product/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newProduct: newProduct }),
        });
        const response = await result.json();
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

/**
 * POST request to add a new product
 * @param {Object} newProduct
 * @param {string} newProduct.title
 * @param {string} newProduct.description
 * @param {string} newProduct.price
 * @param {string} newProduct.imageURL
 * @param {string} [newProduct.type]
 * @param {string} [newProduct.category]
 * @param {string} [newProduct.deal]
 * @param {string} [newProduct.dealPrice]
 * @returns {Promise} Promise object represents the added product
 */
const addProduct = async (newProduct) => {
    try {
        const result = await fetch("http://localhost:3001/product/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newProduct),
        });
        const response = await result.json();
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}