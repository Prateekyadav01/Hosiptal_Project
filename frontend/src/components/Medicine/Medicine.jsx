import React, { useReducer } from 'react';
import { medicine } from '../../assets/constants';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_CART':
      const existingItemIndex = state.cart.findIndex(
        (item) => item.name === action.payload.name
      );
      if (existingItemIndex !== -1) {
        return {
          ...state,
          cart: state.cart.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    case 'CART_INCREMENT': {
      return {
        ...state,
        cart: state.cart.map((ele, index) => {
          if (index === action.payload) {
            return {
              ...ele,
              quantity: ele.quantity + 1,
            };
          } else {
            return ele;
          }
        }),
      };
    }
    case 'CART_DECREMENT': {
      return {
        ...state,
        cart: state.cart
          .map((ele, index) => {
            if (index === action.payload) {
              return {
                ...ele,
                quantity: ele.quantity - 1,
              };
            } else {
              return ele;
            }
          })
          .filter(item => item.quantity > 0),
      };
    }
    default:
      return state;
  }
}

const initialValue = {
  cart: [],
};

const Medicine = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const handleAddCart = (item) => {
    dispatch({ type: 'ADD_CART', payload: item });
  };

  const handleCartIncrement = (id) => {
    dispatch({ type: 'CART_INCREMENT', payload: id });
  };

  const handleCartDecrement = (id) => {
    dispatch({ type: 'CART_DECREMENT', payload: id });
  };

  const calculateTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="p-4" style={{
      backgroundImage: "linear-gradient(rgb(255 225 209),rgb(249 159 159)",
    }}>
      <h1 className="text-2xl font-bold flex items-center justify-center mb-4">Medicine Store</h1>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="md:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Medicine</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {medicine.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
                <button
                  onClick={() => handleAddCart(item)}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 p-4 bg-white sticky top-10 rounded-lg shadow-md mt-4 md:mt-0 h-fit">
          <h2 className="text-2xl font-bold mb-4">Cart</h2>
          <div className="space-y-4">
            {state.cart.length > 0 ? (
              state.cart.map((item, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-50 flex items-center justify-between">
                  <div className='flex gap-3'>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleCartIncrement(index)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">+</button>
                    <p className="text-gray-600">{item.quantity}</p>
                    <button onClick={() => handleCartDecrement(index)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700">-</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Your cart is empty.</p>
            )}
            {state.cart.length > 0 && (
              <h3 className='flex items-center justify-center font-bold'>Total: ${calculateTotal().toFixed(2)}</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicine;
