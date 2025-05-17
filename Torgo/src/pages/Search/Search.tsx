import React, { useEffect, useState } from 'react';
import Footer from '../../components/simple/Footer/Footer';
import Header from '../../components/simple/Header/Header';
import { Link, useParams } from 'react-router-dom';
import CartProduct, { CartProductProps } from '../../components/smart/CartProduct/CartProduct';
import { PREFIX } from '../../api/API';
import axios from 'axios';

const Search = () => {
  const [products, setProducts] = useState<CartProductProps[]>([]);
  const { productName } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${PREFIX}/api/v1/user/advertisements`);
        setProducts(res.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filtered = products.filter((product) =>
    product.name?.toLowerCase().includes(productName?.toLowerCase() || "")
  );

  return (
    <>
      <Header />
      <div className="p-6">
        <h2 className="text-xl mb-4">Результати пошуку: "{productName}"</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 justify-items-start">
          {filtered.map((product) => (
            <Link to={`/info-cart/${product.id}`} key={product.id} state={{ product }}>
              <CartProduct {...product} />
            </Link>
          ))}
          {filtered.length === 0 && <p>Нічого не знайдено.</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;