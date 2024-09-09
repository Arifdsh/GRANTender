import React, { useState } from 'react'
import { Formik, useFormik } from 'formik';
import { AuthorizationSchema } from './AuthorizationSchema.js'
import './authorization.scss'

const Authorization = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (e) =>{
    e.preventDefault(); 
    setIsModalOpen(true)
  } 
  const closeModal = () => setIsModalOpen(false);

  const { values, handleChange, errors, handleSubmit, touched } = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      age: "",
      password: "",
      confirmPassword: ""
    },
    onSubmit: (values, actions) => {
      actions.resetForm()
    },
    validationSchema: AuthorizationSchema
  });
  return (
    <div>Authorization</div>
  )
}

export default Authorization