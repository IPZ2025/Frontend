import Footer from "../../components/simple/Footer/Footer";
import Header from "../../components/simple/Header/Header";

import ListCategores from "../../components/smart/ListCategores/ListCategores";

import CartProduct, { CartProductProps } from "../../components/smart/CartProduct/CartProduct";

const Home = () => {

  const products: CartProductProps[] = [
    {
      id: "1",
      name: "Смартфон Xiaomi",
      image: "./cartImage/cart1.svg",
      price: 8999,
      countre: "Китай",
      date: new Date("2025-04-15T10:00:00"),
    },
    {
      id: "2",
      name: "Пилосос Dyson",
      image: "./cartImage/cart1.svg",
      price: 15999,
      countre: "Велика Британія",
      date: new Date("2025-04-16T14:30:00"),
    },
    {
      id: "3",
      name: "Телевізор Samsung",
      image: "./cartImage/cart1.svg",
      price: 24999,
      countre: "Південна Корея",
      date: new Date("2025-04-17T09:45:00"),
    },
    {
      id: "4",
      name: "Телевізор Samsung",
      image: "./cartImage/cart1.svg",
      price: 24999,
      countre: "Південна Корея",
      date: new Date("2025-04-17T09:45:00"),
    }

  ];
  

  return (
    <>
      <Header />
      <div className="bg-white text-gray-800">
        <div
          className="w-full h-[700px] overflow-hidden bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/background/HomePage.svg')" }}
        >
          <div className="w-[70%] bg-[#D9D9D9]/70 rounded-2xl p-12 text-center">
            <p className="text-7xl font-bold">Продавайте разом з Torgo</p>
          </div>
        </div>
        <div className="flex flex-col items-center w-full px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-[#244622]">Наші категорії</h2>
          <ListCategores />
        </div>
        <div className="flex flex-col items-center w-full px-4 py-8 pb-20 ">
          <h2 className="text-3xl font-bold mb-6 text-[#244622] text-center pb-2">VIP-Оголошення</h2>

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

export default Home;
