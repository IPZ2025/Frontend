import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../../store/store';
import { login } from '../../../store/auth.slice';
import { useEffect, useState } from 'react';

interface LoginFormData { 
  email: string; 
  password: string; 
}

const Login = () => {
  const dispatch = useDispatch<AppDispath>();
  const { jwt } = useSelector((s: RootState) => s.user);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => { 
    if (jwt) navigate('/'); 
  }, [jwt, navigate]); 

  const onSubmit = async (data: LoginFormData) => { 
    setLoginError(null);
    
    try {
      const result = await dispatch(login(data));
      
      if (login.fulfilled.match(result)) {
      } else if (login.rejected.match(result)) {
        const errorMessage = result.payload as string || 'Невірний email або пароль';
        setLoginError(errorMessage);
      }
    } catch (error) {
      setLoginError('Сталася помилка під час входу');
      console.error("Login error:", error);
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#5B7056] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Вхід</h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                id="email" 
                {...register('email', { 
                  required: "Email обов'язковий",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Невірний формат email"
                  }
                })} 
                type="email" 
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
              <input 
                id="password" 
                {...register('password', { 
                  required: "Пароль обов'язковий", 
                  minLength: { 
                    value: 16,
                    message: "Пароль повинен містити щонайменше 16 символів" 
                  } 
                })} 
                type="password" 
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-sm text-[#3D9637] hover:underline">Забули пароль?</Link>
              </div>
            </div>
          </div>

          {loginError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-center">
              {loginError}
            </div>
          )}

          <div>
            <button 
              type="submit" 
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3D9637] hover:bg-[#2e7d32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D9637]`}
            >
              Увійти
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Не зареєстрований?</span>{' '}
          <Link to="/auth/register" className="font-medium text-[#3D9637] hover:underline">Створити користувача</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;