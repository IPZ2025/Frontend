import React from 'react'

function Footer() {
  return (
    <footer className="bg-[#405F39] text-white">
      <div className="w-full h-10 bg-[#3a5229]" />

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-12 p-10 text-xl w-full max-w-7xl">
          <div>
            <h2 className="text-2xl font-bold mb-4">Про нас</h2>
            <p className="mb-2">Доставка</p>
            <p className="mb-2">Оплата</p>
            <p className="mb-2">Контакти</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Служба підтримки</h2>
            <p className="mb-2">Правила сайту</p>
            <p className="mb-2">Повернення товару</p>
          </div> 

          <div>
            <h2 className="text-2xl font-bold mb-4">Соціальні мережі</h2>
            <div className="flex gap-4 mt-2">
              <img src="./icons/facebook.svg" alt="Facebook" className="w-[15%] h-[40%]" />
              <img src="./icons/instagram.svg" alt="Instagram" className="w-[15%] h-[40%] ml-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
