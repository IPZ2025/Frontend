import { toFormData } from 'axios';
import React from 'react';

export interface CartProductProps {
  id: string;
  name: string;
  photos: string[];
  price: number;
  categories: string[];
  description: string;
  created_at: string;
  user_id: number;
}

const CartProduct = (cart: CartProductProps) => {
const dateObj = new Date(cart.created_at).toLocaleDateString('uk-UA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

  return (
    <div
    id={cart.id}
    className="w-80 rounded-t-lg overflow-hidden shadow-xl bg-white flex flex-col transform transition-transform hover:scale-105 duration-300 border-0"
    >
    <div className="h-56 overflow-hidden">
      <img
          src={cart.photos[0]? cart.photos[0] : '/cartImage/cart1.svg'}
          alt={cart.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col justify-between h-44">
        <p className="text-xl font-semibold text-gray-800">{cart.name}</p>
        <div className="text-gray-600 text-sm">
          <p>{dateObj}</p>
        </div>
        <p className="text-right text-xl font-bold text-[#244622]">
          {cart.price} грн.
        </p>
      </div>
    </div>
  );
};

export default CartProduct;
