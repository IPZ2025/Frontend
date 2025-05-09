import { Link } from "react-router-dom";
import Footer from "../../components/simple/Footer/Footer";
import Header from "../../components/simple/Header/Header";

import CartProduct, { CartProductProps } from "../../components/smart/CartProduct/CartProduct";
import { Search, ChevronLeft, MoveLeft } from 'lucide-react';

const InfoCart = () => {
    const products: CartProductProps[] = [
        {
            id: "1",
            name: "Смартфон Xiaomi",
            image: "./cartImage/cart1.svg",
            price: 8999,
            countre: "Китай",
            date: new Date("2025-04-15T10:00:00"),
        }
    ];

    return (
        <>
            <Header />
            <div className="breadcrumb flex items-center gap-2 p-4 bg-gray-100">
                <MoveLeft className="text-gray-500" />
                <p className="text-sm text-gray-600"><Link to='/'>Головна</Link>/<Link to='/categores'>Головна</Link>/Запальничка Україна</p>
            </div>

            <div className="info-cart-container flex flex-col md:flex-row gap-8 p-6">
                <div className="product-image-description flex-1">
                    <div className="image-container bg-gray-200 rounded-lg overflow-hidden p-6">
                        <img src="./cartImage/cart1.svg" alt="" className="w-full rounded-lg h-auto object-cover" />
                    </div>
                    <p className="description mt-4 p-6 rounded-lg bg-gray-200 text-gray-700 text-xl leading-relaxed text-justify">
                        Запальничка з зображенням карти України у кольорах державного прапора. Верхня частина прикрашена написом "Ukraine". Стильний аксесуар, який стане чудовим доповненням до вашого повсякденного образу або оригінальним подарунком для близьких. Компактна та зручна у використанні.
                    </p>
                </div>
                <div className="product-details flex-1">
                    <div className="product-info bg-white shadow-md rounded-lg p-6 text-center">
                        <h2 className="text-lg font-bold text-gray-800">Запальничка Україна</h2>
                        <p className="text-xl font-semibold text-gray-800 mt-2">100 грн.</p>
                        <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                            Купити
                        </button>
                    </div>
                    <div className="seller-info bg-white shadow-md rounded-lg p-4 mt-6">
                        <h2 className="text-lg font-bold text-gray-800">Продавець</h2>
                        <div className="seller-details flex items-center gap-4 mt-4">
                            <img src="./sellerImage/seller1.svg" alt="Продавець" className="w-12 h-12 rounded-full bg-gray-200" />
                            <div>
                                <p className="text-gray-800 font-medium">Рибін Андрій</p>
                                <p className="text-sm text-gray-600">Був онлайн в 12:30</p>
                            </div>
                        </div>
                        <div className="contact-seller mt-4">
                            <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                Зв’язатися з продавцем
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default InfoCart;
