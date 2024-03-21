import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';


const CartPage =()=>{

  const userId = useContext(UserContext);

  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    if(userId){
      
    getCartItems();
    }
  }, [userId]);

  const getCartItems = async () => {

    try {

      const response = await fetch(`http://localhost:3001/cart/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if(response.ok){

        const data = await response.json();
        console.log(data.data);
        setCartItems(data.data);

      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

    
    return (
        <div className="container cart-page">
          
          <h3>Cart</h3>

          <table className="table table-striped">
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
              {/* cartItems.map(item => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.name} style={{ width: '100px' }} /></td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>{ item.price.toFixed(2) * item.quantity}</td>
                  <td><button className='btn btn-danger'><FontAwesomeIcon icon={faTrashAlt} /></button></td>
                </tr>
              )) */}
            </tbody>
          </table>
        </div>
      );
}

export default CartPage