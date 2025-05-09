import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../../store/store';
import { registration } from '../../../store/auth.slice';
import { useEffect } from 'react';

interface RegistrationFormData { name: string; surname: string; email: string; phone: string; password: string; confirmPassword: string; }

const Registrate = () => {
  const dispatch = useDispatch<AppDispath>();
  const { jwt } = useSelector((s: RootState) => s.user);
  const navigate = useNavigate(); 
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegistrationFormData>();
  const namePattern = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s'-]+$/;
  const phonePattern = /^\+380[0-9]{9}$/;

  useEffect(() => { if (jwt) navigate('/'); }, [jwt, navigate]);

  const onSubmit = (data: RegistrationFormData) => {
    try { dispatch(registration({ name: data.name, surname: data.surname, email: data.email, phone: data.phone, password: data.password })); } 
    catch (error) { console.log("Error:", error); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#5B7056] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center"><h2 className="mt-6 text-3xl font-extrabold text-gray-900">Реєстрація</h2></div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ім'я</label>
              <input id="name" {...register('name', { required: "Ім'я обов'язкове", pattern: { value: namePattern, message: "Будь ласка, введіть тільки літери" } })} type="text" className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Фамілія</label>
              <input id="surname" {...register('surname', { required: "Фамілія обов'язкова", pattern: { value: namePattern, message: "Будь ласка, введіть тільки літери" } })} type="text" className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.surname && <p className="mt-1 text-sm text-red-600">{errors.surname.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input id="email" {...register('email', { required: "Email обов'язковo" })} type="text" className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Телефон: +380-000-00-00</label>
              <input id="phone" {...register('phone', { required: "Телефон обов'язковий", pattern: { value: phonePattern, message: "Введіть коректний номер телефону у форматі +380XXXXXXXXX" } })} type="tel" placeholder="+380-000-00-00" className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
              <input id="password" {...register('password', { required: "Пароль обов'язковий", minLength: { value: 6, message: "Пароль повинен містити щонайменше 6 символів" } })} type="password" className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Підтвердження пароля</label>
              <input id="confirmPassword" {...register('confirmPassword', { required: "Підтвердження пароля обов'язкове", validate: (value) => value === watch('password') || 'Паролі не співпадають' })} type="password" className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3D9637] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Створити</button>
          </div>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Вже зареєстрований?</span>{' '}
          <Link to={'/auth/login'} className="font-medium text-[#3D9637]">Вхід</Link>
        </div>
      </div>
    </div>
  );
};

export default Registrate;