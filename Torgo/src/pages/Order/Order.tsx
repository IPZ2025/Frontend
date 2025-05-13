import React, { useState } from 'react';
import Footer from '../../components/simple/Footer/Footer';
import Header from '../../components/simple/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../store/message.slice';

const Order = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState('nova');
  const [useAccountData, setUseAccountData] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    postOffice: '', // Это поле для адреса
    deliveryMethod: ''  // Поле для способа доставки
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Автозаполнение данных (только name, surname, email, phone)
  const autofillData = () => ({
    name: 'Іван',
    surname: 'Петренко',
    email: 'ivan@example.com',
    phone: '+380123456789'
  });

  const handleSubmit = async () => {
    try {
      // Формируем данные для отправки
      const payload = {
        ...(useAccountData ? autofillData() : {
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone: formData.phone
        }),
        deliveryMethod,
        ...(deliveryMethod !== 'pickup' && formData.postOffice ? { postOffice: formData.postOffice } : {})
      };

      console.log(payload); // Проверка данных

      // Отправка данных на сервер (раскомментировать при реальной интеграции)
      // await axios.post('/api/orders', {
      //   ...payload,
      //   payment: 'cod', // Тип оплаты
      // });

      dispatch(setMessage('Замовлення успішно оформлено!'));
      navigate('/');
    } catch (error) {
      console.error('Помилка при оформленні:', error);
      alert('Щось пішло не так. Спробуйте ще раз.');
    }
  };

  // Данные для отображения (если используются данные аккаунта)
  const displayedData = useAccountData ? { ...autofillData(), postOffice: formData.postOffice } : formData;

  return (
    <>
      <Header />

      {showSuccess && (
        <div className="bg-green-100 text-green-700 p-4 text-center">
          Замовлення успішно оформлено!
        </div>
      )}

      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Оформлення замовлення</h2>

        <div className="mb-4">
          <label className="font-semibold block mb-1">Спосіб доставки:</label>
          <div className="flex gap-4">
            {['nova', 'ukr', 'pickup'].map(method => (
              <label key={method}>
                <input
                  type="radio"
                  name="delivery"
                  value={method}
                  checked={deliveryMethod === method}
                  onChange={() => setDeliveryMethod(method)}
                />{' '}
                {method === 'nova' ? 'Нова Пошта' : method === 'ukr' ? 'Укрпошта' : 'Самовивіз'}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="font-semibold block mb-1">Спосіб оплати:</label>
          <select className="border rounded p-2 w-full" disabled>
            <option value="cod">Оплата при отриманні</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="font-semibold block mb-2">
            <input
              type="checkbox"
              checked={useAccountData}
              onChange={() => setUseAccountData(!useAccountData)}
            />{' '}
            Використати дані акаунта
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Ім’я"
            className="border rounded p-2 w-full"
            value={displayedData.name}
            onChange={handleChange}
            disabled={useAccountData}
          />
          <input
            type="text"
            name="surname"
            placeholder="Прізвище"
            className="border rounded p-2 w-full"
            value={displayedData.surname}
            onChange={handleChange}
            disabled={useAccountData}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border rounded p-2 w-full"
            value={displayedData.email}
            onChange={handleChange}
            disabled={useAccountData}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            className="border rounded p-2 w-full"
            value={displayedData.phone}
            onChange={handleChange}
            disabled={useAccountData}
          />
        </div>

        {(deliveryMethod === 'nova' || deliveryMethod === 'ukr') && (
          <div className="mb-4">
            <label className="block mb-1">Номер та адрес відділення</label>
            <input
              name="postOffice"
              value={formData.postOffice}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}

        <button
          className="bg-[#3D9637] text-white px-6 py-2 rounded hover:bg-[#2e7d32]"
          onClick={handleSubmit}
        >
          Підтвердити замовлення
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Order;