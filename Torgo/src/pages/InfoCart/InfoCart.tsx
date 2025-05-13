import { Link } from "react-router-dom";
import Footer from "../../components/simple/Footer/Footer";
import Header from "../../components/simple/Header/Header";
import { MoveLeft, Heart, Share2, MessageSquare, Phone } from 'lucide-react';

const InfoCart = () => {
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
                                src="./cartImage/cart1.svg" 
                                alt="Запальничка Україна" 
                                className="w-full h-96 object-contain p-6"
                            />
                        </div>
                                           
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Опис товару</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Запальничка з зображенням карти України у кольорах державного прапора. Верхня частина прикрашена написом "Ukraine". Стильний аксесуар, який стане чудовим доповненням до вашого повсякденного образу або оригінальним подарунком для близьких. Компактна та зручна у використанні.
                            </p>
                        </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Запальничка Україна</h1>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-green-600">100 грн</p>
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
                                        <p className="text-gray-800 font-medium">Запальничка</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Дата публікації</p>
                                        <p className="text-gray-800 font-medium">25.09.2025</p>
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
                                    src="./UserIcon.svg" 
                                    alt="Рибін Андрій" 
                                    className="w-14 h-14 rounded-full object-cover border-2 border-green-100"
                                />
                                <div>
                                    <h4 className="font-medium text-gray-900">Рибін Андрій</h4>
                                </div>
                            </div>
                            
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MessageSquare className="h-5 w-5 text-gray-600" />
                                    <span>Контакти</span>
                                </button>
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