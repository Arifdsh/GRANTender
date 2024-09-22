import  { useState, useEffect } from 'react';
import './profileEdit.scss';
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser, editUser, hideProfileEditForm } from '../../../features/usersSlice';
import { profileEditSchema } from './profileEditShema';
import { useFormik } from 'formik';


const ProfileEdit = () => {
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser());
    }
  }, [status, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: user.name || '',
      surname: user.surname || '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: profileEditSchema,
    onSubmit: async (values) => {
      
      if (values.oldPassword) {
        if (values.oldPassword !== user.password) {
          alert("Köhnə şifrə düzgün deyil.");
          return;
        }
        
        
        const userData = {
          id: user.id,
          name: values.name,
          surname: values.surname,
          password: values.newPassword || user.password, 
          picture,
        };

        
        if (!values.newPassword) {
          delete userData.password; 
        }

        await dispatch(editUser(userData));
      } else {
       
        const userData = {
          id: user.id,
          name: values.name,
          surname: values.surname,
          picture,
        };
        
        await dispatch(editUser(userData));
      }

      dispatch(hideProfileEditForm());
    },
  });

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result); 
        setPreview(URL.createObjectURL(file)); 
      };
      reader.readAsDataURL(file); 
    }
  };


  return (
    <div className="edit-area">
    <IoCloseCircle className="close" onClick={() => dispatch(hideProfileEditForm())} />
    <h2>Profili Redaktə et</h2>
    <form onSubmit={formik.handleSubmit} className="profile-edit-form">
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
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
      </div>

      <div className="edit-input-group">
        <label htmlFor="profile-surname">Soyadınızı dəyişin:</label>
        <input
          type="text"
          id="profile-surname"
          {...formik.getFieldProps('surname')}
        />
        {formik.touched.surname && formik.errors.surname ? <div>{formik.errors.surname}</div> : null}
      </div>

      <div className="edit-input-group">
        <label htmlFor="old-password">Köhnə şifrənizi daxil edin:</label>
        <input
          type="password"
          id="old-password"
          {...formik.getFieldProps('oldPassword')}
        />
        {formik.touched.oldPassword && formik.errors.oldPassword ? <div>{formik.errors.oldPassword}</div> : null}
      </div>

      <div className="edit-input-group">
        <label htmlFor="new-password">Yeni şifrəni daxil edin:</label>
        <input
          type="password"
          id="new-password"
          {...formik.getFieldProps('newPassword')}
        />
        {formik.touched.newPassword && formik.errors.newPassword ? <div>{formik.errors.newPassword}</div> : null}
      </div>

      <div className="edit-input-group">
        <label htmlFor="confirm-password">Yeni şifrəni təsdiqləyin:</label>
        <input
          type="password"
          id="confirm-password"
          {...formik.getFieldProps('confirmPassword')}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
      </div>

      <button type="submit" className="edit-submit-btn">Yadda saxla</button>
    </form>
  </div>
  );
};

export default ProfileEdit;
