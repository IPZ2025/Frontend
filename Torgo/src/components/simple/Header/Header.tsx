import { Search, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

function Header() {
  const { jwt } = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-[#405F39] text-white p-1 grid grid-cols-2 items-center">
      <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
        <div className="w-[75%] pl-6">
          <img
            src="./Logo.svg"
            alt="Логотип"
            className="w-[100%] h-[100%] rounded-[23px] object-cover"
          />
        </div>
        <div className="flex w-[60%] rounded overflow-hidden bg-[#D9D9D9] ">
          <input
            type="text"
            placeholder="Пошук..."
            className="w-full px-4 py-2 text-black bg-[#D9D9D9] placeholder-gray-600 focus:outline-none pl-6"
          />
          <button className="px-3 bg-[#D9D9D9] text-black hover:bg-gray-300">
            <Search />
          </button>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 pr-6 w-full h-full text-lg">
        
        {jwt ? (
          <div>
            <button className="bg-[#D9D9D9] text-black px-4 py-2 rounded-lg hover:bg-gray-300 text-lg w-700">
              Додати оголошення
            </button>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#557047] h-50">
              <div className="w-6 h-6 flex items-center justify-center bg-[#4CAF50] text-white font-bold rounded text-lx">
                T
              </div>
              <span className="text-white text-lg">User</span>
              <div className="text-white text-xl">
                <ChevronLeft />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link 
              to="/auth/login" 
              className="bg-[#D9D9D9] text-black px-4 py-2 rounded-lg hover:bg-gray-300 text-lg"
            >
              Увійти
            </Link>
            <Link 
              to="/auth/register" 
              className="bg-[#3D9637] text-white px-4 py-2 rounded-lg hover:bg-[#2e7d32] text-lg"
            >
              Реєстрація
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header;