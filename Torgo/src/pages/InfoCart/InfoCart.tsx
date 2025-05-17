import { Link, useParams } from "react-router-dom";
import Footer from "../../components/simple/Footer/Footer";
import Header from "../../components/simple/Header/Header";
import { MoveLeft, MessageSquare, Phone } from 'lucide-react';
import { useEffect, useState } from "react";
import axios from "axios";
import { PREFIX } from "../../api/API";
import { CartProductProps } from "../../components/smart/CartProduct/CartProduct";
import { UserData } from "../Profile/Profile";

const InfoCart = () => {
    const [products, setProducts] = useState<CartProductProps>();
    const [user, setUser] = useState<UserData>();

    const { productId } = useParams();

useEffect(() => {
    if (!productId || isNaN(Number(productId))) {
        console.error('Некоректний productId:', productId);
        return;
    }

    const fetchProduct = async () => {
        try {
            const resProduct = await axios.get(`${PREFIX}/api/v1/user/advertisements`);
            const index = parseInt(productId) - 1;
            if (resProduct.data.data[index]) {
                setProducts(resProduct.data.data[index]);
            } else {
                console.error('Продукт не знайдено за індексом', index);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    fetchProduct();
}, [productId]);


    useEffect(() => {
    const fetchUser = async (product_id: number) => {
        try {
        const resUser = await axios.get(`${PREFIX}/api/v1/user/${product_id}`);
        console.log(resUser.data);
        setUser(resUser.data);
        } catch (error) {
        console.error('Error fetching user:', error);
        }
    };
    if (products?.user_id) fetchUser(products?.user_id)
    }, [products?.user_id]);

    
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            {/* Breadcrumb */}
            <div className="bg-gray-50 py-3 px-4 md:px-6 border-b">
                <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
                    <Link to="/" className="flex items-center text-green-600 hover:text-green-700">
                        <MoveLeft className="h-4 w-4 mr-1" />
                        Головна
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link to="/categories" className="text-green-600 hover:text-green-700">Категорії</Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-600">Запальничка Україна</span>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 py-8 px-4 md:px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <img 
                                src={`${products?.photos[0]}`} 
                                alt="Запальничка Україна" 
                                className="w-full h-96 object-contain p-6"
                            />
                        </div>
                                           
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Опис товару</h3>
                            <p className="text-gray-600 leading-relaxed">
                            {products?.description}
                            </p>
                        </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{products?.name}</h1>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-green-600">{products?.price}грн</p>
                                </div>
                            </div>
                            
                            <div className="mt-6 space-y-4">
                                <Link to='/order'>
                                    <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                                        Замовити
                                    </button>
                                </Link>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h3 className="font-medium text-gray-800 mb-3">Деталі товару</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Категорія</p>
                                        <p className="text-gray-800 font-medium">{products?.categories[0]}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Дата публікації</p>                                        
                                        <p className="text-gray-800 font-medium">
                                        {products?.created_at 
                                            ? new Date(products.created_at).toLocaleDateString('uk-UA', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })
                                            : 'Дата не указана'}
                                        </p>                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Seller Info */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Продавець</h3>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <img 
                                    src={`${user?.image}`} 
                                    alt="Рибін Андрій" 
                                    className="w-14 h-14 rounded-full object-cover border-2 border-green-100"
                                />
                                <div>
                                    <h4 className="font-medium text-gray-900">{user?.name}</h4>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-6 w-full">
                                <div className="flex items-center py-2.5 px-3 bg-gray-50 rounded-lg w-full">
                                    <MessageSquare className="h-5 w-5 text-gray-600" />
                                    <span className="text-gray-700">{user?.email || 'Email відсутній'}</span>
                                </div>
                                <div className="flex items-center gap-2 py-2.5 px-3 bg-gray-50 rounded-lg w-full">
                                    <Phone className="h-5 w-5 text-gray-600" />
                                    <span className="text-gray-700">{user?.phone || 'Телефон відсутній'}</span>
                                </div>
                            </div>                  
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default InfoCart;