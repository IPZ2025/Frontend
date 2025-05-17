import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/simple/Header/Header';
import Footer from '../../components/simple/Footer/Footer';
import { PREFIX } from '../../api/API';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export interface UserData {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  addresses: string;
  image: string;
}


const Profile = () => {
const [userData, setUserData] = useState<UserData>({
  id: 0,
  name: '',
  surname: '',
  phone: '',
  email: '',
  addresses: '',
  image: ''
});

  
  const [originalData, setOriginalData] = useState<UserData>({ ...userData });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isIdUser, setisIdUser] = useState<number | null>(null);

  const jwt = useSelector((state: RootState) => state.user.jwt);

  useEffect(() => {
    const fetchUserData = async (token: string) => {
      try {
        const response = await axios.get(`${PREFIX}/api/v1/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setisIdUser(response.data.id)
        console.log(response.data);
        setUserData(response.data);
        setOriginalData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (jwt) {
      fetchUserData(jwt);
    } else {
      console.log('JWT token is missing');
    }
  }, [jwt]);

const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string); // base64 string
      if (!isEditing) setIsEditing(true);
    };
    reader.readAsDataURL(file); // convert to base64
  }
};


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    if (!isEditing) {
      setIsEditing(true);
    }
  };

const handleEditClick = async () => {
  if (isEditing) {
    setIsSaving(true);
    try {
      const payload: any = {
        name: userData.name,
        surname: userData.surname,
        phone: userData.phone,
        addresses: userData.addresses || '', // необов'язкове
      };

      if (userData.email !== originalData.email) {
        payload.email = userData.email;
      }

      if (profileImage) {
        payload.image_base64 = profileImage; // надсилаємо base64
      }

      const response = await axios.patch(`${PREFIX}/api/v1/user/${isIdUser}`, payload, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        }
      });

      setOriginalData({ ...userData });
      setOriginalImage(profileImage);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    } finally {
      setIsSaving(false);
    }
  } else {
    setIsEditing(true);
  }
};




  const hasChanges = () => {
    return userData.name !== originalData.name ||
        userData.surname !== originalData.surname ||
        userData.phone !== originalData.phone ||
        userData.email !== originalData.email ||
        userData.addresses !== originalData.addresses ||
        (profileImage !== null && profileImage !== originalImage);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 m-10">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <Link to='/' className="text-green-600 hover:text-green-700 font-medium">← Назад на головну</Link>
            <h2 className="text-xl font-semibold text-center">Налаштування</h2>
            <div className="w-24"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
                <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Ім’я</label>
                <input 
                    type="text" 
                    name="firstName"
                    value={userData.name} 
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full p-2 border rounded-md ${
                    isEditing 
                        ? 'bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                        : 'bg-gray-100 border-gray-200 text-gray-600'
                    }`}
                />
                </div>

                <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Прізвище</label>
                <input 
                    type="text" 
                    name="lastName"
                    value={userData.surname} 
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full p-2 border rounded-md ${
                    isEditing 
                        ? 'bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                        : 'bg-gray-100 border-gray-200 text-gray-600'
                    }`}
                />
                </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Телефон</label>
                <input 
                  type="text" 
                  name="phone"
                  value={userData.phone} 
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`w-full p-2 border rounded-md ${
                    isEditing 
                      ? 'bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                      : 'bg-gray-100 border-gray-200 text-gray-600'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Електрона пошта</label>
                <input 
                  type="email" 
                  name="email"
                  value={userData.email} 
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`w-full p-2 border rounded-md ${
                    isEditing 
                      ? 'bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                      : 'bg-gray-100 border-gray-200 text-gray-600'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Місцезнаходження</label>
                <input 
                  type="text"
                  name="addresses"
                  value={userData.addresses}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`w-full p-2 border rounded-md ${
                    isEditing 
                      ? 'bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                      : 'bg-gray-100 border-gray-200 text-gray-600'
                  }`}
                />
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleEditClick}
                  disabled={isEditing && !hasChanges()}
                  className={`w-full p-2 text-sm rounded-md text-white ${
                    isEditing 
                      ? hasChanges() 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#3D9637] hover:bg-[#2d6e29]'
                  }`}
                >
                  {isSaving ? 'Зберігаємо...' : isEditing ? 'Зберегти' : 'Оновити дані'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Фото профіля</h3>
              <div className="flex justify-center">
                <img 
                  src={profileImage || userData.image || './UserIcon.svg'} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              <input
                type="file"
                id="photoUpload"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={!isEditing}
              />
              <label 
                htmlFor="photoUpload" 
                className={`block text-center p-2 rounded-md cursor-pointer ${
                  isEditing 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Вибрати з файлу
              </label>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;