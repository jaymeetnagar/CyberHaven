import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CartPage =()=>{

    // dummy cart data
    const cartItems = [
        {
        id: 1,
        image: 'https://placehold.co/150x100',
        name: 'Product 1',
        price: 10.99,
        quantity: 2
        },
        {
        id: 2,
        image: 'https://placehold.co/150x100',
        name: 'Product 2',
        price: 19.99,
        quantity: 1
        },
        {
            id: 2,
            image: 'https://placehold.co/150x100',
            name: 'Product 3',
            price: 19.99,
            quantity: 1
            }
    ];
    
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
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.name} style={{ width: '100px' }} /></td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>{ item.price.toFixed(2) * item.quantity}</td>
                  <td><button className='btn btn-danger'><FontAwesomeIcon icon={faTrashAlt} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default CartPage