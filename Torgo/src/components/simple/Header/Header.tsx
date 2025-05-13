import { useState } from 'react';
import { Search, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { userActions } from '../../../store/auth.slice';

function Header() {
  const { jwt } = useSelector((state: RootState) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userActions.logout());
    navigate('/auth/login');
  };

  return (
    <header className="bg-[#405F39] text-white p-1 grid grid-cols-2 items-center">
      <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
        <Link to='/'>
          <div className="w-[75%] pl-6">
            <img
              src="./Logo.svg"
              alt="Логотип"
              className="w-[100%] h-[100%] rounded-[23px] object-cover"
            />
          </div>
        </Link>
        <div className="flex w-[60%] rounded overflow-hidden bg-[#D9D9D9]">
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

      <div className="flex justify-end items-center gap-4 pr-6 w-full h-full text-lg relative">
        {jwt ? (
          <div className="flex gap-2 relative">
            <Link to='/publication-create'>
              <button className="bg-[#D9D9D9] text-black px-4 py-2 rounded-lg hover:bg-gray-300 text-lg">
                Додати оголошення
              </button>
            </Link>

            {/* Меню користувача */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-1 rounded-md h-50"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src="./UserIcon.svg"
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white text-lg">User</span>
                <ChevronLeft className={`transform transition-transform ${menuOpen ? '-rotate-90' : ''}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Профіль
                  </Link>
                  <Link
                    to="/my-publication"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Мої оголошення
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Вийти
                  </button>
                </div>
              )}
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
  );
}

export default Header;
