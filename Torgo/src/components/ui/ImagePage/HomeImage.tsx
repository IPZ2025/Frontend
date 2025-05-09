const HomeImage = () => {
    return (
        <div
          className="w-full h-[700px] overflow-hidden bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/background/HomePage.svg')" }}
        >
          <div className="w-[70%] bg-[#D9D9D9]/70 rounded-2xl p-12 text-center">
            <p className="text-7xl font-bold">Продавайте разом з Torgo</p>
          </div>
        </div>
    );
};

export default HomeImage;