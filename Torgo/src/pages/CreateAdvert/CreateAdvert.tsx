import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/simple/Header/Header';
import Footer from '../../components/simple/Footer/Footer';
import { Plus, ArrowLeft } from 'lucide-react';

const CreateAdvert = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    photo: '' as string | null // Теперь храним только одно фото в base64
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Проверка размера файла (например, не более 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер 5MB.');
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({
            ...prev,
            photo: event.target?.result as string
          }));
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photo: null
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Подготовка данных для отправки
    const submissionData = {
      ...formData,
      photo: formData.photo ? formData.photo.split(',')[1] : null // Удаляем префикс data:image/...
    };
    
    console.log('Form submitted:', submissionData);
    // Здесь будет логика отправки данных на сервер
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Назад
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">Створити оголошення</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Назва*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Категорія*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Оберіть категорію</option>
                  <option value="electronics">Електроніка</option>
                  <option value="fashion">Мода</option>
                  <option value="home">Дім і сад</option>
                  <option value="transport">Транспорт</option>
                  <option value="services">Послуги</option>
                </select>
              </div>

              {/* Фото */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Фото*
                </label>
                <div className="flex items-center space-x-3">
                  {formData.photo ? (
                    <div className="relative group">
                      <img 
                        src={formData.photo} 
                        alt="Uploaded preview" 
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-green-500 transition-colors w-24 h-24">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="text-center p-2">
                        <Plus className="h-6 w-6 text-gray-400 mx-auto" />
                        <span className="text-xs text-gray-500">Додати фото</span>
                      </div>
                    </label>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Додайте одне фото товару</p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Опис*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Ціна*
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">грн</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  disabled={!formData.photo} // Кнопка неактивна, если нет фото
                >
                  Створити оголошення
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateAdvert;