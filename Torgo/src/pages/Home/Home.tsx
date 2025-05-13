import Footer from "../../components/simple/Footer/Footer";
import Header from "../../components/simple/Header/Header";

import ListCategores from "../../components/smart/ListCategores/ListCategores";
import CartProduct, { CartProductProps } from "../../components/smart/CartProduct/CartProduct";

import HomeImage from "../../components/ui/ImagePage/HomeImage";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { clearMessage } from "../../store/message.slice";
import axios from "axios";
import { PREFIX } from "../../api/API";

const Home = () => {


  const [products, setProducts] = useState<CartProductProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${PREFIX}/api/v1/user/advertisements`);
        console.log(response.data.data);
        setProducts(response.data.data);
        console.log(products)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const message = useSelector((state: RootState) => state.alert.message);
  const dispatch = useDispatch();

    useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <>
      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-300 text-green-900 px-6 py-2 rounded shadow-lg z-50 animate-fade">
          {message}
        </div>
      )}
      <Header />
      <div className="bg-white text-gray-800">
        <HomeImage />
        <div className="flex flex-col items-center w-full px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-[#244622]">Наші категорії</h2>
          <ListCategores />
        </div>
        <div className="flex flex-col items-center w-full px-4 py-8 pb-20 ">
          <h2 className="text-3xl font-bold mb-6 text-[#244622] text-center pb-2">VIP-Оголошення</h2>
          <div className="flex flex-wrap gap-14 justify-center w-full">
            {products.map((product) => (
              <Link to="/infoCart" key={product.id}>
                <CartProduct {...product} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
