import React, { useEffect, useState } from 'react'
import './hero.scss'
import tenderPhoto from '../../assets/image/tenderphoto2.png'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser, updateUser, setLoggedInUser } from '../../features/usersSlice.js';

const Hero = () => {
    const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name); // Set the user's name from localStorage
    }
  }, []);
    
    return (
        <section className='hero'>
            <div className="container">
                <h1 className="hero__content">{userName}Biznesinizi böyüdün: Tender tapın və <span
                    id="js-rotating"></span>
                </h1>
                <div className="hero__photo"><img src={tenderPhoto} alt="" /></div>
            </div>
        </section>
    )
}

export default Hero