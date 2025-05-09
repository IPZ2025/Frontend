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
    path: '/infoCart',
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
