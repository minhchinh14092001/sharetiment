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
  // const [user, setUser] = useState(null);
  const responseGoogle = (response) => {
    var profileObj = jwt_decode(response.credential);
    const { name, sub, imageUrl } = profileObj;
    const user = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(user).then(() => {
      navigate('/', { replace: true });
    });
    console.log('Google Account Information:', user);
  };

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

export default Login