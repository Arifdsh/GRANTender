import React, { useState, useEffect } from 'react';
import './profileEdit.scss';
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../../../features/usersSlice';

const ProfileEdit = () => {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);

  // Fetch profile data on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser());
    }
  }, [status, dispatch]);

  // Update local state with fetched profile data
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPicture(user.picture || null);
      setPreview(user.picture ? URL.createObjectURL(new Blob([user.picture], { type: 'image/jpeg' })) : null);
    }
  }, [user]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result); // base64 string
        setPreview(URL.createObjectURL(file)); // For preview
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      picture, // base64 image
    };

    try {
      dispatch(updateUser(userData)); // Corrected to use updateUser
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="edit-area">
      <IoCloseCircle  className="close" />
      <h2> Profili Redaktə et</h2>
      <form onSubmit={handleSubmit} className="profile-edit-form">
        <div className="edit-input-group">
          <label htmlFor="profile-picture">Şəklinizi dəyişin:</label>
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handlePictureChange}
          />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}
        </div>

        <div className="edit-input-group">
          <label htmlFor="profile-name">Adınızı dəyişin:</label>
          <input
            type="text"
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınızı daxil edin"
          />
        </div>

        <button type="submit" className="edit-submit-btn">Yadda saxla</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
