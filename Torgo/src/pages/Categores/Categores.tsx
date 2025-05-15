import Footer from "../../components/simple/Footer/Footer";
import Header from "../../components/simple/Header/Header";

import ListCategores from "../../components/smart/ListCategores/ListCategores";
import CartProduct, { CartProductProps } from "../../components/smart/CartProduct/CartProduct";

import HomeImage from "../../components/ui/ImagePage/HomeImage";

const Categories = () => {

    const products: CartProductProps[] = [
        {
            id: "1",
            name: "Смартфон Xiaomi",
            image: "./cartImage/cart1.svg",
            price: 8999,
            created_at: "2025-04-15T10:00:00",
        },
        {
            id: "2",
            name: "Пилосос Dyson",
            image: "./cartImage/cart1.svg",
            price: 15999,
            created_at: "2025-04-16T14:30:00",
        },
        {
            id: "3",
            name: "Телевізор Samsung",
            image: "./cartImage/cart1.svg",
            price: 24999,
            created_at: "2025-04-17T09:45:00",
        },
        {
            id: "4",
            name: "Ноутбук Dell",
            image: "./cartImage/cart1.svg",
            price: 34999,
            created_at: "2025-04-18T12:00:00",
        },
        {
            id: "5",
            name: "Пральна машина LG",
            image: "./cartImage/cart1.svg",
            price: 19999,
            created_at: "2025-04-19T08:30:00",
        },
        {
            id: "6",
            name: "Холодильник Bosch",
            image: "./cartImage/cart1.svg",
            price: 27999,
            created_at: "2025-04-20T15:45:00",
        },
        {
            id: "7",
            name: "Кавоварка Philips",
            image: "./cartImage/cart1.svg",
            price: 7999,
            created_at: "2025-04-21T11:15:00",
        },
        {
            id: "8",
            name: "Електросамокат Segway",
            image: "./cartImage/cart1.svg",
            price: 15999,
            created_at: "2025-04-22T09:00:00",
        },
        {
            id: "9",
            name: "Ігрова консоль PlayStation 5",
            image: "./cartImage/cart1.svg",
            price: 19999,
            created_at: "2025-04-23T13:30:00",
        },
        {
            id: "10",
            name: "Навушники Sony WH-1000XM5",
            image: "./cartImage/cart1.svg",
            price: 9999,
            created_at: "2025-04-24T16:00:00",
        }
    ];

    return (
    <>
      <Header />
      <div className="bg-white text-gray-800">

        <HomeImage />

        <div className="flex justify-between space-around items-center px-6 py-4 bg-gray-100 border-b border-gray-300">
            <div>
            <p className="text-base text-gray-700">
                <a href="/" className="text-green-600 hover:underline">Головна</a> / Хобі
            </p>
            </div>
            <div className="flex items-center pr-10">
            <p className="text-base text-gray-700">Сортувати за:</p>
            <select className="border border-gray-300 rounded-md p-2 ml-4 mr-10 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="price">За ціною</option>
                <option value="date">За датою</option>
                <option value="name">За релевантністю</option>
            </select>
            </div>
        </div>


        <div className="flex flex-col items-center w-full px-4 py-8 pb-20 ">
          <div className="flex flex-wrap gap-14 justify-center w-full">
            {products.map((product) => (
              <CartProduct key={product.id} {...product} />
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </>
    );
};

export default Categories;