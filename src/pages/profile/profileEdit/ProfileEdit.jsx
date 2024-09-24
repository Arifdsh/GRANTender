import { useState, useEffect } from 'react';
import './profileEdit.scss';
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, editUser, hideProfileEditForm } from '../../../features/usersSlice';
import { profileEditSchema } from './profileEditShema';
import { useFormik } from 'formik';


const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);
  const [picture, setPicture] = useState(user.picture || null);
  const [preview, setPreview] = useState(user.picture ? user.picture : null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);


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
      if (showPasswordFields && values.oldPassword !== user.password) {
        alert("Köhnə şifrə düzgün deyil.");
        return;
      }

      const userData = {
        id: user.id,
        name: values.name,
        surname: values.surname,
        password: showPasswordFields ? values.newPassword : undefined,
        picture: picture || null,
      };

      await dispatch(editUser(userData));
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

  const handleDeletePicture = () => {
    setPicture(null);
    setPreview(null);
  };

  const handleTogglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
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
          {preview ? (
            <>
              <img src={preview} alt="Preview" className="image-preview" />
              <button type="button" onClick={handleDeletePicture} className="delete-picture-btn">
                Şəkli Sil
              </button>
            </>
          ) : (
            <p>Hazırda şəkil yoxdur.</p>
          )}
        </div>

        <div className="edit-input-group">
          <label htmlFor="profile-name">Adınızı dəyişin:</label>
          <input
            placeholder='Adınızı daxil edin'
            type="text"
            id="profile-name"
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </div>

        <div className="edit-input-group">
          <label htmlFor="profile-surname">Soyadınızı dəyişin:</label>
          <input
            placeholder='Soyadınızı daxil edin'
            type="text"
            id="profile-surname"
            {...formik.getFieldProps('surname')}
          />
          {formik.touched.surname && formik.errors.surname ? <div>{formik.errors.surname}</div> : null}
        </div>

        <div className="edit-input-group">
          <button type="button" className="edit-submit-btn" onClick={handleTogglePasswordFields}>
            {showPasswordFields ? 'Şifrə dəyişməyin' : 'Şifrəni dəyişin'}
          </button>
        </div>

        {showPasswordFields && (
          <>
            <div className="edit-input-group">
              <label htmlFor="old-password">Köhnə şifrənizi daxil edin:</label>
              <input
                placeholder='Şifrə'
                type="password"
                id="old-password"
                {...formik.getFieldProps('oldPassword')}
              />
              {formik.touched.oldPassword && formik.errors.oldPassword ? <div>{formik.errors.oldPassword}</div> : null}
            </div>

            <div className="edit-input-group">
              <label htmlFor="new-password">Yeni şifrəni daxil edin:</label>
              <input
                placeholder='Yeni şifrə'
                type="password"
                id="new-password"
                {...formik.getFieldProps('newPassword')}
              />
              {formik.touched.newPassword && formik.errors.newPassword ? <div>{formik.errors.newPassword}</div> : null}
            </div>

            <div className="edit-input-group">
              <label htmlFor="confirm-password">Yeni şifrəni təsdiqləyin:</label>
              <input
                placeholder='Yeni şifrə'
                type="password"
                id="confirm-password"
                {...formik.getFieldProps('confirmPassword')}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
            </div>
          </>
        )}
        <button type="submit" className="edit-submit-btn">Yadda saxla</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
