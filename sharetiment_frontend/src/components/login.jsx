import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { GoogleLogin, useGoogleOneTapLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { client } from '../client';

const Login = () => {

  const navigate = useNavigate();
  const responseGoogle = (response) => {
    
    var profileObject = jwt_decode(response.credential);
    const { name, sub, picture } = profileObject;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    localStorage.setItem('user', JSON.stringify(doc));
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
    console.log('Google Account Information:', doc);
  };
  // Retrieve the user item from localStorage
const userItem = localStorage.getItem('user');

// Check if the user item exists
if (userItem) {
  // Convert the JSON string back to an object
  const user = JSON.parse(userItem);

  // Log the user object to the console
  console.log('User Item:', user);

  // You can access individual properties of the user object like this:
  const userId = user._id;
  const userName = user.userName;
  const userProfileImage = user.image;

  console.log('User ID:', userId);
  console.log('User Name:', userName);
  console.log('User Profile Image:', userProfileImage);
} else {
  console.log('User item not found in localStorage.');
}
  

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video 
        src={shareVideo}
        type='video/mp4'
        muted
        autoPlay
        loop
        controls={false}
        className='w-full h-full object-cover'
        />

        <div className='absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay'>
        <div className='p-5'>
            <img src={logo} width='130px' alt='logo' />
          </div>
          <GoogleLogin
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
        />;
        </div>
      </div>
    </div>
    
  )
}

// export const setUserInfoInLocalStorage = (doc) => {
//   localStorage.setItem('user', JSON.stringify(doc));
// };

export default Login