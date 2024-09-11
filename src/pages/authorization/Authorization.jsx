import { useState } from 'react'
import { Formik, useFormik } from 'formik';
import { AuthorizationSchema } from './AuthorizationSchema.js'
import './authorization.scss'
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/usersSlice.js';

const Authorization = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch()

  const openModal = (e) =>{
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
      dispatch(updateUser(userData))
        .then(() => {
          actions.resetForm();
          closeModal();
        })
        .catch((error) => {
          console.error('Failed to update user:', error);
        });
    },
    validationSchema: AuthorizationSchema
  });

  return (
    <div>
      <section className='authorization'>
        <ul className="login">
          <li className="login__leftside">
            <h1 className="login__leftside__heading">LOGIN</h1>
          </li>
          <li className="login__rightside">
            <form action="" className="login__form">
              <input type="text" placeholder="Email or phone number" className="login__username input"  />
              {errors.name && <div className='error'>{errors.name}</div>}
              <input type="password" placeholder="Password" className="login__password input" />
              <button className="login__logIn">Log In</button>
              <a href="" className="login__forgetPassword">Forget password?</a>
              <hr />
              <button onClick={openModal} className="login__newAccount">Register</button>
              {/* <a onClick={openModal} className="login__newAccount">Register</a> */}
              <div className="userInfo"></div>
            </form>
          </li>
        </ul>
        <div className={isModalOpen ? "modal active" : "modal"}>
          <h1 className="modal__heading">Registration</h1>
          <form className="register" onSubmit={handleSubmit}>
            <input name='name' className="register__name input" type="text" placeholder="Name" value={values.name} onChange={handleChange}/>
            {errors.name && touched.name && <div className='error'>{errors.name}</div>}
            <input name='surname' className="register__surname input" type="text" placeholder="Surname" value={values.surname} onChange={handleChange}/>
            {errors.surname && touched.surname && <div className='error'>{errors.surname}</div>}
            <input name='email' className="register__email input" type="email" placeholder="Email" value={values.email} onChange={handleChange} />
            {errors.email && touched.email && <div className='error'>{errors.email}</div>}
            <input name='age' className="register__dateTime input" type="date" placeholder="Birth date" value={values.age} onChange={handleChange}/>
            {errors.age && touched.age && <div className='error'>{errors.age}</div>}
            <input name='password' className="register__password input" type="password" placeholder=" Set password" value={values.password} onChange={handleChange}/>
            {errors.password && touched.password && <div className='error'>{errors.password}</div>} 
            <input name='confirmPassword' className="register__confirmPassword input" type="password" placeholder=" Confirm password" value={values.confirmPassword} onChange={handleChange}/>
            {errors.confirmPassword && touched.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}
          <button type='submit' className="register__button">Register</button>
          </form>
          {/* <i className="fa-solid fa-circle-xmark"></i> */}
          <button onClick={closeModal} className="close">Close</button>
        </div>
      </section>

    </div>
  )
}

export default Authorization