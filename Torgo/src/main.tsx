import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css'

import Home from './pages/Home/Home';
import Categories from './pages/Categores/Categores';
import InfoCart from './pages/InfoCart/InfoCart';
import AuthLayout from './layout/Auth/AuthLayout';
import Registrate from './pages/Auth/Registrate/Registrate';
import Login from './pages/Auth/Login/Login';
import { store } from './store/store';
import Profile from './pages/Profile/Profile';
import CreateAdvert from './pages/CreateAdvert/CreateAdvert';
import Order from './pages/Order/Order';
import MyAdvert from './pages/MyAdvert/MyAdvert';
import Search from './pages/Search/Search';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/categores',
    element: <Categories/>,
  },
  {
    path: '/info-cart/:productId/',
    element: <InfoCart/>
  },
  {
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			}, 
      {
				path: 'register',
				element: <Registrate />
			}
		]
	},
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/publication-create',
    element: <CreateAdvert />
  },
  {
    path: '/order',
    element: <Order />
  },
  {
    path: '/my-publication',
    element: <MyAdvert />
  },
  {
    path: '/search/:productName',
    element: <Search />
  },
  {
		path: '*',
		element: <div>Ошибка</div>
	}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
