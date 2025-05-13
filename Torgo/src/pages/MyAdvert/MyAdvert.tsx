import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/simple/Header/Header';
import Footer from '../../components/simple/Footer/Footer';
import { Edit, Trash2, ChevronLeft, X, Image as ImageIcon } from 'lucide-react';

interface Advertisement {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  date: string;
}

const MyAdvert = () => {
  const [ads, setAds] = useState<Advertisement[]>([
    {
      id: '1',
      title: 'Запальничка Україна',
      price: 100,
      description: 'Якісна запальничка з українською символікою',
      image: '/cartImage/cart1.svg',
      date: '2023-05-15'
    },
    {
      id: '2',
      title: 'Запальничка Україна',
      price: 100,
      description: 'Якісна запальничка з українською символікою',
      image: '/cartImage/cart1.svg',
      date: '2023-05-16'
    },
    {
      id: '3',
      title: 'Запальничка Україна',
      price: 100,
      description: 'Якісна запальничка з українською символікою',
      image: '/cartImage/cart1.svg',
      date: '2023-05-17'
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    price: 0,
    description: '',
    image: '',
    newImage: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Ви впевнені, що хочете видалити це оголошення?')) return;

    try {
      setIsLoading(true);
      setError('');
      
      // Отправка запроса на удаление
      await axios.delete(`/api/advertisements/${id}`);
      
      // Обновление состояния после успешного удаления
      setAds(ads.filter(ad => ad.id !== id));
    } catch (err) {
      console.error('Помилка при видаленні оголошення:', err);
      setError('Не вдалося видалити оголошення');
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (ad: Advertisement) => {
    setEditingId(ad.id);
    setEditForm({
      title: ad.title,
      price: ad.price,
      description: ad.description,
      image: ad.image,
      newImage: null
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditForm(prev => ({
        ...prev,
        newImage: file,
        image: URL.createObjectURL(file)
      }));
    }
  };

  const removeImage = () => {
    setEditForm(prev => ({
      ...prev,
      newImage: null,
      image: ''
    }));
  };

const saveEdit = async (id: string) => {
  try {
    setIsLoading(true);
    setError('');
    
    // Підготовка даних в форматі JSON
    const data = {
      title: editForm.title,
      price: editForm.price,
      description: editForm.description,
      image: editForm.newImage ? await convertToBase64(editForm.newImage) : editForm.image, // Перетворюємо файл в base64, якщо він є
    };

    // Виведення JSON для перевірки
    console.log(data);

    // Запит на оновлення оголошення
    // const response = await axios.put(`/api/advertisements/${id}`, data, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // });

    // // Оновлення стану після успішного оновлення
    // setAds(ads.map(ad => 
    //   ad.id === id ? response.data : ad
    // ));
    // setEditingId(null);
  } catch (err) {
    console.error('Помилка при оновленні оголошення:', err);
    setError('Не вдалося оновити оголошення');
  } finally {
    setIsLoading(false);
  }
};

// Функція для перетворення файлу в base64
const convertToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};


  const cancelEdit = () => {
    setEditingId(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/profile" className="flex items-center text-green-600 hover:text-green-700 mb-6">
          <ChevronLeft className="h-5 w-5 mr-2" />
          Назад до профілю
        </Link>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Мої оголошення</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map(ad => (
            <div key={ad.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-4">
                {editingId === ad.id ? (
                  <div className="space-y-4">
                    {/* Поле для загрузки изображения */}
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer mb-2 relative"
                        onClick={triggerFileInput}
                      >
                        {editForm.image ? (
                          <>
                            <img 
                              src={editForm.image} 
                              alt="Preview" 
                              className="h-full w-full object-cover rounded-md"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage();
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <div className="text-center">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <span className="text-gray-500">Додати фото</span>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      <span className="text-xs text-gray-500">Натисніть для зміни фото</span>
                    </div>

                    {/* Поля редактирования */}
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      placeholder="Назва"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="number"
                      name="price"
                      value={editForm.price}
                      onChange={handleEditChange}
                      placeholder="Ціна"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      placeholder="Опис"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />

                    <div className="flex space-x-2">
                      <button 
                        onClick={() => saveEdit(ad.id)}
                        disabled={isLoading}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400"
                      >
                        {isLoading ? 'Збереження...' : 'Зберегти'}
                      </button>
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
                      {ad.image ? (
                        <img src={ad.image} alt={ad.title} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-gray-500">Немає зображення</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{ad.title}</h3>
                    <p className="text-gray-800 font-bold mb-2">{ad.price} грн.</p>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{ad.description}</p>
                    <p className="text-gray-500 text-sm mb-4">Додано: {new Date(ad.date).toLocaleDateString()}</p>
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => startEditing(ad)}
                        className="p-2 text-blue-600 hover:text-blue-800"
                        aria-label="Редагувати"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(ad.id)}
                        disabled={isLoading}
                        className="p-2 text-red-600 hover:text-red-800 disabled:text-red-300"
                        aria-label="Видалити"
                      >
                        <Trash2 size={18} />
                      </button>
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