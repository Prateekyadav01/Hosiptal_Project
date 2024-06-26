import React, { useReducer } from 'react';
import { medicine } from '../../assets/constants';
import { orderGenerate, verifyOrder } from '../../utils/Api';
import toast, { Toaster } from 'react-hot-toast';


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
  const baseUrl = "http://localhost:3000/api/v1";
  const handleAddCart = (item) => {
    dispatch({ type: 'ADD_CART', payload: item });
  };

  const handleCartIncrement = (id) => {
    dispatch({ type: 'CART_INCREMENT', payload: id });
  };

  const handleCartDecrement = (id) => {
    dispatch({ type: 'CART_DECREMENT', payload: id });
  };
 let total ;
  const calculateTotal = () => {
    total =state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    return total;
    // return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePayment = async()=>{
    try {
      const data = await orderGenerate(total);
      console.log(data);
        toast.success('Order Placed Successfully');
       const ans = verifyOrder(data?.data);
       console.log(ans.message);
      // toast.success('Payment done')
    } catch (error) {
      
    }
  }
  

  // const handleVerify = async() =>{
  //   try {
  //     const response = await verifyOrder()
  //   } catch (error) {
      
  //   }
  // }

  return (
    <div className="p-4 bg-gray-900" >
  <h1 className="text-2xl font-bold text-white flex items-center justify-center mb-4  ">Medical Store</h1>
  <div className="flex flex-col md:flex-row md:space-x-4">
    <div className="md:w-1/2 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Medicine</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {medicine.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition">
            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600">${item.price}</p>
            <button
              onClick={() => handleAddCart(item)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
    <div className="md:w-1/2 p-4 bg-white sticky top-10 rounded-lg shadow-lg mt-4 md:mt-0 h-fit">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Cart</h2>
      <div className="space-y-4">
        {state.cart.length > 0 ? (
          state.cart.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-50 flex items-center justify-between">
              <div className="flex gap-3">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => handleCartIncrement(index)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">+</button>
                <p className="text-gray-600">{item.quantity}</p>
                <button onClick={() => handleCartDecrement(index)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">-</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
        {state.cart.length > 0 && (
          <h3 className="flex items-center justify-center font-bold text-gray-800">Total: ${calculateTotal()}</h3>
        )}
        <button onClick={handlePayment} className="w-full mt-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">Payment</button>
      </div>
    </div>
  </div>
  <Toaster />
</div>

  );
};

export default Medicine;
