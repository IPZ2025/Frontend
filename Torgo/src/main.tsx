import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Home from './pages/Home/Home';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },	
  {
		path: '*',
		element: <div>Ошибка</div>
	}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
