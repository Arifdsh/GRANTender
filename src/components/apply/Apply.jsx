import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import applyShema from './applySchema.js'
import './apply.scss'
import { useDispatch, useSelector } from 'react-redux';
import { submitApplyList } from '../../features/applySlice.js';
import { selectSelectedTenderId, selectSelectedTenderOwnerId } from '../../features/tendersSlice.js';
import { applyForTender, checkLoggedInUser } from '../../features/usersSlice.js';

const Apply = () => {
  const dispatch = useDispatch()

  const selectedTenderId = useSelector(selectSelectedTenderId);
  const tenderOwnerId = useSelector(selectSelectedTenderOwnerId)
  const loggedInUser = useSelector((state)=> state.user.user)

  useEffect(()=>{
    dispatch(checkLoggedInUser())
  }, [])

  const initialValues = {
    name: '',
    description: '',
    details: '',
    userId: loggedInUser?.id || '',
    cardId: selectedTenderId || '',
    tenderOwnerId: tenderOwnerId || '',
    file: null,
  };

  const handleSubmit = (values, {resetForm}) => {
    const formData = {
      ...values,
      file: values.file ? values.file.name : null,
    }

    dispatch(submitApplyList(formData))
    dispatch(applyForTender({ userId: loggedInUser?.id, tenderId: selectedTenderId }))
    resetForm()
  }

  return (
    <div className="apply-tender">
      <h2>MÜRACİƏT FORMU</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={applyShema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="form-container">
            <div className="form-group">
              <label htmlFor="name">Şirkət adı</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Şirkət haqqında</label>
              <Field as="textarea" id="description" name="description" rows="4" />
              <ErrorMessage name="description" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="details">Komanda üzvləri</label>
              <Field as="textarea" id="details" name="details" rows="4" />
              <ErrorMessage name="details" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="file" className='fileLabel'>Upload File</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={(event) => setFieldValue('file', event.currentTarget.files[0])}
              />
              <ErrorMessage name="file" component="div" className="error-message" />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Apply