import React from 'react'

const ListCategores = () => {
  return (
    <div className="flex flex-col items-center w-full px-4">
      <div className="flex flex-wrap justify-between w-full max-w-6xl gap-20">
        <div className="flex flex-col items-center gap-3">
          <img
            src="./categories/Ellipse 2-1.svg"
            alt="Авто"
            className="w-32 h-32 border-4 border-[#3D9637] rounded-full"
          />
          <p className="text-xl font-semibold text-[#244622]">Авто</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <img
            src="./categories/Ellipse 2-2.svg"
            alt="Нерухомість"
            className="w-32 h-32 border-4 border-[#3D9637] rounded-full"
          />
          <p className="text-xl font-semibold text-[#244622]">Нерухомість</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <img
            src="./categories/Ellipse 2-3.svg"
            alt="Електроніка"
            className="w-32 h-32 border-4 border-[#3D9637] rounded-full"
          />
          <p className="text-xl font-semibold text-[#244622]">Електроніка</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-between w-full max-w-6xl gap-8 mt-8">
        <div className="flex flex-col items-center gap-3">
          <img
            src="./categories/Ellipse 2-4.svg"
            alt="Одяг"
            className="w-32 h-32 border-4 border-[#3D9637] rounded-full"
          />
          <p className="text-xl font-semibold text-[#244622]">Одяг</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <img
            src="./categories/Ellipse 2-5.svg"
            alt="Ремонт"
            className="w-32 h-32 border-4 border-[#3D9637] rounded-full"
          />
          <p className="text-xl font-semibold text-[#244622]">Ремонт</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <img
            src="./categories/Ellipse 2.svg"
            alt="Хобі"
            className="w-32 h-32 border-4 border-[#3D9637] rounded-full"
          />
          <p className="text-xl font-semibold text-[#244622]">Хобі</p>
        </div>
      </div>
    </div>
  )
}

export default ListCategores
