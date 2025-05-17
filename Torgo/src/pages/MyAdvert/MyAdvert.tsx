import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/simple/Header/Header';
import Footer from '../../components/simple/Footer/Footer';
import { Edit, Trash2, ChevronLeft, X, Image as ImageIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { PREFIX } from '../../api/API';
import { CartProductProps } from '../../components/smart/CartProduct/CartProduct';
import { UserData } from '../Profile/Profile';

const MyAdvert = () => {
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const [products, setProducts] = useState<CartProductProps[]>([]);
  const [user, setUser] = useState<UserData>();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    image: '',
    price: 0,
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async (token: string) => {
      try {
        const res = await axios.get(`${PREFIX}/api/v1/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (jwt) fetchUserData(jwt);
  }, [jwt]);

  useEffect(() => {
    const fetchAdvert = async (token: string, userId: number) => {
      try {
        const response = await axios.get(`${PREFIX}/api/v1/user/${userId}/advertisements`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching advertisements:', error);
      }
    };
    if (jwt && user) fetchAdvert(jwt, user.id);
  }, [jwt, user]);

  const handleDelete = async (id: string, idUser: number, token: string) => {
    if (!window.confirm('Ви впевнені, що хочете видалити це оголошення?')) return;
    try {
      setIsLoading(true);
      setError('');
      await axios.delete(`${PREFIX}/api/v1/user/${idUser}/advertisements/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      setProducts(products.filter(ad => ad.id !== id));
    } catch (err) {
      console.error('Помилка при видаленні оголошення:', err);
      setError('Не вдалося видалити оголошення');
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (ad: CartProductProps) => {
    setEditingId(ad.id);
    setEditForm({
      name: ad.name,
      price: ad.price,
      description: ad.description,
      image: ad.photos[0],
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const saveEdit = async (id: string, idUser: number, token: string) => {
    try {
      setIsLoading(true);
      setError('');
      const data = {
        name: editForm.name,
        price: editForm.price,
        description: editForm.description,
        image: editForm.image,
      };
      const response = await axios.put(`${PREFIX}/api/v1/user/${idUser}/advertisements/${id}`, data, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setProducts(products.map(ad => (ad.id === id ? response.data : ad)));
      setEditingId(null);
    } catch (err) {
      console.error('Помилка при оновленні оголошення:', err);
      setError('Не вдалося оновити оголошення');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link to="/profile" className="flex items-center text-green-600 hover:text-green-700 mb-6">
          <ChevronLeft className="h-5 w-5 mr-2" /> Назад до профілю
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Мої оголошення</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(ad => (
            <div key={ad.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
              <div className="p-4">
                {editingId === ad.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="image"
                      value={editForm.image}
                      onChange={handleEditChange}
                      placeholder="Посилання на зображення"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {editForm.image && (
                      <div className="h-48 bg-gray-200 mb-2 flex items-center justify-center">
                        <img src={editForm.image} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                    )}
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      placeholder="Назва"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <input
                      type="number"
                      name="price"
                      value={editForm.price}
                      onChange={handleEditChange}
                      placeholder="Ціна"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      placeholder="Опис"
                      rows={3}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <div className="flex space-x-2">
                      {user && jwt && 
                      <button
                      onClick={() => saveEdit(ad.id, user.id, jwt)}
                        disabled={isLoading}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400"
                      >
                        {isLoading ? 'Збереження...' : 'Зберегти'}
                      </button>}
                      <button
                        onClick={cancelEdit}
                        disabled={isLoading}
                        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
                      >
                        Скасувати
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="h-48 bg-gray-200 mb-4 flex items-center justify-center">
                      {ad.photos[0] ? (
                        <img src={ad.photos[0]} alt={ad.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-gray-500">Немає зображення</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{ad.name}</h3>
                    <p className="text-gray-800 font-bold mb-2">{ad.price} грн.</p>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{ad.description}</p>
                    <div className="flex space-x-2">
                      <button onClick={() => startEditing(ad)} className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                        <Edit className="h-4 w-4 mr-1" /> Редагувати
                      </button>
                      {user && jwt && (
                        <button
                          onClick={() => handleDelete(ad.id, user.id, jwt)}
                          disabled={isLoading}
                          className="flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-400"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Видалити
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAdvert;
