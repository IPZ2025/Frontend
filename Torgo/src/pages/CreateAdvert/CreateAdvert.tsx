  import React, { useEffect, useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import Header from '../../components/simple/Header/Header';
  import Footer from '../../components/simple/Footer/Footer';
  import { Plus, ArrowLeft } from 'lucide-react';
  import { useDispatch, useSelector } from 'react-redux';
  import { setMessage } from '../../store/message.slice';
  import axios from 'axios';
  import { PREFIX } from '../../api/API';
  import { RootState } from '../../store/store';

  const CreateAdvert = () => {
    const [formData, setFormData] = useState({
      title: '',
      category: '',
      description: '',
      price: '',
      photo: '' as string | null
    });
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isIdUser, setUserId] = useState<number | null>(null);
    const jwt = useSelector((state: RootState) => state.user.jwt);
    const [links, setLinks] = useState<string[]>(['']);


    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${PREFIX}/api/v1/auth/me`, {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          });
          setUserId(response.data.id);
        } catch (error) {
          navigate('/');
          console.error('Error fetching user data:', error);
        }
      };
      if (jwt) {
        fetchUserData();
      }
    }, [jwt]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };



    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
          
      try {
        const response = await axios.post(`${PREFIX}/api/v1/user/${isIdUser}/advertisements`, {
          name: formData.title,
          description: formData.description,
          price: formData.price,
          categories: [1, 2],
          photos: links.filter(link => link.trim() !== '')
        }, {
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response);
        dispatch(setMessage('Оголошення успішно створено!'));
        navigate('/');
      } catch (error) {
        console.error("Error creating advertisement:", error);
        dispatch(setMessage('Помилка при створенні оголошення'));
      }
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
                    <option value="electronics">I'll</option>
                    <option value="fashion">Мода</option>
                    <option value="home">Дім і сад</option>
                    <option value="transport">Транспорт</option>
                    <option value="services">Послуги</option>
                  </select>
                </div>

                {/* Фото */}
               <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Посилання на зображення (макс. 5)*
              </label>

              <div className="space-y-2">
                {links.map((link, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="url"
                      placeholder={`Посилання ${index + 1}`}
                      value={link}
                      onChange={(e) => {
                        const newLinks = [...links];
                        newLinks[index] = e.target.value;
                        setLinks(newLinks);
                      }}
                      required={index === 0} // перше поле обов'язкове
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {links.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newLinks = links.filter((_, i) => i !== index);
                          setLinks(newLinks);
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Видалити
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {links.length < 5 && (
                <button
                  type="button"
                  onClick={() => setLinks([...links, ''])}
                  className="mt-2 text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Додати ще посилання
                </button>
              )}
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