import { useState, useEffect } from 'react'
import { Formik, useFormik } from 'formik';
import { AuthorizationSchema } from './AuthorizationSchema.js'
import './authorization.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser, setLoggedInUser } from '../../features/usersSlice.js';
import Navbar from '../../components/navbar/Navbar.jsx';
import { Navigate, useNavigate } from 'react-router-dom';

const Authorization = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigate=useNavigate();

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch, user]);

  const handleLogin = (e) => {
    e.preventDefault()
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    }

    const foundUser = user.find((user) => user.email == loginData.email)

    if (foundUser) {
      if (foundUser.password == loginData.password) {
        setLoginError('')
        dispatch(setLoggedInUser({ name: foundUser.name, id: foundUser.id }));
        navigate("/")
      }
      else {
        setLoginError('Incorrect password')
      }
    }
    else {
      setLoginError('User not found')
    }
  }

  const openModal = (e) => {
    e.preventDefault();
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
    },
    onSubmit: (values, actions) => {
      const { confirmPassword, ...userData } = values

      const emailExists = user.some((existingUser) => existingUser.email == userData.email)

      if (emailExists) {
        actions.setFieldError('email', 'Email already in use')
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
      <Navbar />
      <section className='authorization'>
        <ul className="login">
          <li className="login__leftside">
            <h1 className="login__leftside__heading">LOGIN</h1>
          </li>
          <li className="login__rightside">
            <form onSubmit={handleLogin} className="login__form">
              <input type="email" name="email" placeholder="Email" className="login__username input" />
              <input type="password" name="password" placeholder="Password" className="login__password input" />
              {loginError && <div className="error">{loginError}</div>}
              <button type="submit" className="login__logIn">Log In</button>
              <a href="" className="login__forgetPassword">Forget password?</a>
              <hr />
              <button onClick={openModal} className="login__newAccount">Register</button>
              <div className="userInfo"></div>
            </form>
          </li>
        </ul>
        <div className={isModalOpen ? "modal active" : "modal"}>
          <h1 className="modal__heading">Registration</h1>
          <form className="register" onSubmit={handleSubmit}>
            <input name='name' className="register__name input" type="text" placeholder="Name" value={values.name} onChange={handleChange} />
            {errors.name && touched.name && <div className='error'>{errors.name}</div>}
            <input name='surname' className="register__surname input" type="text" placeholder="Surname" value={values.surname} onChange={handleChange} />
            {errors.surname && touched.surname && <div className='error'>{errors.surname}</div>}
            <input name='email' className="register__email input" type="email" placeholder="Email" value={values.email} onChange={handleChange} />
            {errors.email && touched.email && <div className='error'>{errors.email}</div>}
            <input name='age' className="register__dateTime input" type="date" placeholder="Birth date" value={values.age} onChange={handleChange} />
            {errors.age && touched.age && <div className='error'>{errors.age}</div>}
            <input name='password' className="register__password input" type="password" placeholder=" Set password" value={values.password} onChange={handleChange} />
            {errors.password && touched.password && <div className='error'>{errors.password}</div>}
            <input name='confirmPassword' className="register__confirmPassword input" type="password" placeholder=" Confirm password" value={values.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && touched.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}
            <button type='submit' className="register__button">Register</button>
          </form>
          <button onClick={closeModal} className="close">Close</button>
        </div>
      </section>

    </div>
  )
}

export default Authorization

