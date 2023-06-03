import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { addItemToCart, removeItemFromCart, deleteItemFromCart } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;

  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);
  const deleteItemHandler = () => deleteItemFromCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <button className='arrow' onClick={removeItemHandler}>
          &#10094;
        </button>
        <span className='value'>{quantity}</span>
        <button className='arrow' onClick={addItemHandler}>
          &#10095;
        </button>
      </span>
      <span className='price'>{price}</span>
      <button className='remove-button' onClick={deleteItemHandler}>
        &#10005;
      </button>
    </div>
  );
};

export default CheckoutItem;
