import Footer from "../../components/simple/Footer/Footer";
import Header from "../../components/simple/Header/Header";

import ListCategores from "../../components/smart/ListCategores/ListCategores";
import CartProduct, { CartProductProps } from "../../components/smart/CartProduct/CartProduct";

import HomeImage from "../../components/ui/ImagePage/HomeImage";
import { useState } from "react";

const Categories = () => {
    

  const initialProducts: CartProductProps[] = [
  {
    id: "1",
    name: "Смартфон Xiaomi",
    photos: ["./cartImage/cart1.svg"],
    price: 8999,
    categories: ["Електроніка", "Смартфони"],
    description: "Сучасний смартфон із потужним процесором та камерою.",
    created_at: "2025-04-15T10:00:00",
    user_id: 101,
  },
  {
    id: "2",
    name: "Пилосос Dyson",
    photos: ["./cartImage/cart2.svg"],
    price: 15999,
    categories: ["Побутова техніка", "Прибирання"],
    description: "Безпровідний пилосос з високою потужністю всмоктування.",
    created_at: "2025-04-16T14:30:00",
    user_id: 102,
  },
  {
    id: "3",
    name: "Телевізор Samsung",
    photos: ["./cartImage/cart3.svg"],
    price: 24999,
    categories: ["Електроніка", "Телевізори"],
    description: "4K Smart TV з великим екраном та яскравим зображенням.",
    created_at: "2025-04-17T09:45:00",
    user_id: 103,
  },
  {
    id: "4",
    name: "Ноутбук Dell",
    photos: ["./cartImage/cart4.svg"],
    price: 34999,
    categories: ["Комп'ютери", "Ноутбуки"],
    description: "Продуктивний ноутбук для роботи та навчання.",
    created_at: "2025-04-18T12:00:00",
    user_id: 104,
  },
  {
    id: "5",
    name: "Пральна машина LG",
    photos: ["./cartImage/cart5.svg"],
    price: 19999,
    categories: ["Побутова техніка", "Прання"],
    description: "Енергоефективна пральна машина з інтелектуальним керуванням.",
    created_at: "2025-04-19T08:30:00",
    user_id: 105,
  },
  {
    id: "6",
    name: "Холодильник Bosch",
    photos: ["./cartImage/cart6.svg"],
    price: 27999,
    categories: ["Побутова техніка", "Холодильники"],
    description: "Двокамерний холодильник з системою No Frost.",
    created_at: "2025-04-20T15:45:00",
    user_id: 106,
  },
  {
    id: "7",
    name: "Кавоварка Philips",
    photos: ["./cartImage/cart7.svg"],
    price: 7999,
    categories: ["Кухонна техніка", "Кавоварки"],
    description: "Автоматична кавоварка для справжніх поціновувачів кави.",
    created_at: "2025-04-21T11:15:00",
    user_id: 107,
  },
  {
    id: "8",
    name: "Електросамокат Segway",
    photos: ["./cartImage/cart8.svg"],
    price: 15999,
    categories: ["Транспорт", "Електросамокати"],
    description: "Швидкий та зручний електросамокат для міських поїздок.",
    created_at: "2025-04-22T09:00:00",
    user_id: 108,
  },
  {
    id: "9",
    name: "Ігрова консоль PlayStation 5",
    photos: ["./cartImage/cart9.svg"],
    price: 19999,
    categories: ["Електроніка", "Ігрові приставки"],
    description: "Найновіша ігрова консоль з підтримкою 4K та VR.",
    created_at: "2025-04-23T13:30:00",
    user_id: 109,
  },
  {
    id: "10",
    name: "Навушники Sony WH-1000XM5",
    photos: ["./cartImage/cart10.svg"],
    price: 9999,
    categories: ["Аудіо", "Навушники"],
    description: "Преміум навушники з шумозаглушенням та якісним звуком.",
    created_at: "2025-04-24T16:00:00",
    user_id: 110,
  },
];
const [products, setProducts] = useState<CartProductProps[]>(initialProducts);
  const [sortBy, setSortBy] = useState<string>("");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);

    const sorted = [...products];

    switch (value) {
      case "price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "date":
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setProducts(sorted);
  };

  return (
    <>
      <Header />
      <div className="bg-white text-gray-800">

        <HomeImage />

        <div className="flex justify-between items-center px-6 py-4 bg-gray-100 border-b border-gray-300">
          <p className="text-base text-gray-700">
            <a href="/" className="text-green-600 hover:underline">Головна</a> / Хобі
          </p>
          <div className="flex items-center pr-10">
            <p className="text-base text-gray-700">Сортувати за:</p>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-md p-2 ml-4 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Оберіть...</option>
              <option value="price">За ціною</option>
              <option value="date">За датою</option>
              <option value="name">За назвою</option>
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