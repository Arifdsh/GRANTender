import { useState, useEffect } from 'react'
import { Formik, useFormik } from 'formik';
import { AuthorizationSchema } from './AuthorizationSchema.js'
import './authorization.scss'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, setLoggedInUser, fetchAllUsers, loginUser } from '../../features/usersSlice.js';
import Navbar from '../../components/navbar/Navbar.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaAngleDoubleLeft } from 'react-icons/fa';

const Authorization = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();


  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch, users]);

  const handleLogin = (e) => {
    e.preventDefault()
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    }

    const foundUser = users.find((user) => user.email == loginData.email)

    if (foundUser) {
      if (foundUser.password == loginData.password) {
        setLoginError('')
        localStorage.setItem('UserLoggedIn', true)
        dispatch(loginUser(foundUser.id))
        navigate("/")
      }
      else {
        setLoginError('Yanlış şifrə')
      }
    }
    else {
      setLoginError('İstifadəçi tapılmadı')
    }
  }

  const openModal = (e) => {
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false);

  const { values, handleChange, errors, handleSubmit, touched, resetForm } = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      age: "",
      password: "",
      confirmPassword: "",
      loggedIn: false,
      bookmarked: [],
      applied: []
    },
    onSubmit: (values, actions) => {
      const { confirmPassword, ...userData } = values

      const emailExists = users.some((existingUser) => existingUser.email == userData.email)

      if (emailExists) {
        actions.setFieldError('email', 'Bu email artıq istifadə olunub')
      }
      else {
        dispatch(updateUser(userData))
          .then(() => {
            actions.resetForm();
            closeModal();
          })
          .catch((error) => {
            console.error('Failed to update user:', error);
          });
      }
    },
    validationSchema: AuthorizationSchema
  });

  return (
    <div>
      {/* <Navbar /> */}
      <section className='authorization'>
        <button onClick={() => navigate("/")} className="goHome"> <FaAngleDoubleLeft className='goHome__icon' /><span>Əsas səhifə</span></button>
        <ul className="login">
          <li className="login__leftside">
            <h1 className="login__leftside__heading"><IoIosLogIn className='login__icon' />Giriş</h1>
          </li>
          <li className="login__rightside">
            <form onSubmit={handleLogin} className="login__form">
              <input type="email" name="email" placeholder="Email" className="login__username input" />
              <div className="passwordArea">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="login__password input" />
                {!showPassword ? (
                  <IoMdEyeOff className="eye closeEye" onClick={togglePasswordVisibility} />
                ) : (
                  <IoMdEye className="eye showEye" onClick={togglePasswordVisibility} />
                )}

              </div>
              {loginError && <div className="error">{loginError}</div>}

              <button type="submit" className="login__logIn">Daxil ol</button>
              <a href="" className="login__forgetPassword">Şifrəni unutmusan?</a>
              <hr />
              <div className="userInfo"></div>
            </form>
            <button onClick={openModal} className="login__newAccount">Qeydiyyat</button>
          </li>
        </ul>
        <div className={isModalOpen ? "modal active" : "modal"}>
          <h1 className="modal__heading"><MdOutlineDocumentScanner className='modal__icon' />Qeydiyyat</h1>
          <form className="register" onSubmit={handleSubmit}>
            <input name='name' className="register__name input" type="text" placeholder="Name" value={values.name} onChange={handleChange} />
            {errors.name && touched.name && <div className='error'>{errors.name}</div>}
            <input name='surname' className="register__surname input" type="text" placeholder="Surname" value={values.surname} onChange={handleChange} />
            {errors.surname && touched.surname && <div className='error'>{errors.surname}</div>}
            <input name='email' className="register__email input" type="email" placeholder="Email" value={values.email} onChange={handleChange} />
            {errors.email && touched.email && <div className='error'>{errors.email}</div>}
            <input name='age' className="register__dateTime input" type="date" placeholder="Birth date" value={values.age} onChange={handleChange} />
            {errors.age && touched.age && <div className='error'>{errors.age}</div>}
            <div className="passwordArea">
              <input name='password' className="register__password input" type={showPassword ? "text" : "password"} placeholder=" Set password" value={values.password} onChange={handleChange} />
              {!showPassword ? (
                <IoMdEyeOff className="eye closeEye" onClick={togglePasswordVisibility} />
              ) : (
                <IoMdEye className="eye showEye" onClick={togglePasswordVisibility} />
              )}
              {errors.password && touched.password && <div className='error'>{errors.password}</div>}
            </div>
            <input name='confirmPassword' className="register__confirmPassword input" type={showPassword ? "text" : "password"} placeholder=" Confirm password" value={values.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && touched.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}
            <button type='submit' className="register__button">Qeydiyyat</button>
          </form>
          <IoCloseCircle onClick={closeModal} className="close" />
        </div>
      </section>
    </div>
  )
}

export default Authorization

