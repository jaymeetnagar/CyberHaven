import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';


const CartPage = () => {

  const userId = useContext(UserContext);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    
    if (userId) { getCartItems(); }

  }, [userId]);


  const handleRemoveToCart = async (product) => {


    try {

      const response = await fetch("http://localhost:3001/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: product._id, user_id: userId }),
        credentials: "include",
      });


      const data = await response.json();

      if(response.ok){

        console.log(data);
        alert(data.message);
        getCartItems();
      }

    } catch (error) {
      console.error("Error Occured", error);
      alert("Error Remove to Cart");
    }
  };


  const getCartItems = async () => {


    try {

      const response = await fetch(`http://localhost:3001/cart/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {

        const data = await response.json();
        console.log(data.data);
        setCartItems(data.data.items);

      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <div className="container cart-page">

      <h3 className='mb-3'>Cart</h3>
      
      {

      (cartItems && cartItems.length > 0)
      ?  (<table className="table table-striped border">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { cartItems.map(item => (
                <tr key={item.productId._id}>
                  <td><img src={item.productId.imageURL} alt={item.productId.title} style={{ width: '100px' }} /></td>
                  <td>{item.productId.title}</td>
                  <td>${item.productId.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>{ (item.productId.price * item.quantity).toFixed(2)}</td>
                  <td><button className='btn btn-danger' 
                    onClick={ () => handleRemoveToCart(item.productId) }>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              )) }
        </tbody>
      </table>)
      : (<p className='text-muted'>Cart is Empty.</p>)

      }
    </div>
  );
}

export default CartPage