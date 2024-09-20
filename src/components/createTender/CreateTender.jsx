import React, { useState } from 'react'
import './createTender.scss'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import validationSchema from './createTenderValidationSchema';
import { useDispatch } from 'react-redux';
import { createTender } from '../../features/tendersSlice.js';

const CreateTender = () => {
  const [files, setFiles] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()

  const handleFileChange = (event) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ]

    const uploadedFiles = Array.from(event.target.files)

    // Check for duplicates
    const newFiles = uploadedFiles.filter(file => {
      return !files.some(existingFile => existingFile.name === file.name && existingFile.size === file.size && existingFile.type === file.type)
    })

    const filteredFiles = newFiles.filter(file => allowedTypes.includes(file.type))

    if (filteredFiles.length < newFiles.length) {
      setErrorMessage('Only PDF, Word, and Excel files are allowed.')
    } else {
      setErrorMessage('')
    }

    setFiles(prevFiles => [...prevFiles, ...filteredFiles])
  }


  return (
    <div className='ct-main-area'>

      <Formik
        initialValues={{ owner: '', subject: '', endDate: '', address: '', price: '', city: '', files: [] }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {

          const currentDate = new Date().toISOString().split('T')[0]
          const user = JSON.parse(localStorage.getItem('loggedInUser'))
          const userId = user?.id || null

          const newTender = {
            owner: values.owner,
            subject: values.subject,
            address: values.address,
            price: values.price,
            creationDate: currentDate,
            expirationDate: values.endDate,
            city: values.city,
            userId: userId,
            files: files,
          }

          dispatch(createTender(newTender))

          resetForm()
          setFiles([])
        }}
      >
        {({ setFieldValue }) => (
          <Form className='ct-form'>
            <div className='ct-input-holder'>
              <label htmlFor="owner">Elan sahibi:</label>
              <Field type="text" id="owner" name="owner" placeholder='Elan sahibi' />
              <ErrorMessage name="owner" component="div" className="error" />
            </div>
            <div className='ct-input-holder'>
              <label htmlFor="subject">Elanin məqsədi:</label>
              <Field as="textarea" id="subject" name="subject" placeholder='Elanin məqsədi' />
              <ErrorMessage name="subject" component="div" className="error" />
            </div>
            <div className='ct-input-holder'>
              <label htmlFor="city">Şəhər:</label>
              <Field as="select" id="city" name="city" className='ct-input-city'>
                <option value="">Şəhər seçin</option>
                <option value="Baku">Bakı</option>
                <option value="Ganja">Gəncə</option>
                <option value="Sumqayit">Sumqayıt</option>
                <option value="Sheki">Şəki</option>
                <option value="Shamakhi">Şamaxı</option>
                <option value="Zaqatala">Zaqatala</option>
              </Field>
              <ErrorMessage name="city" component="div" className="error" />
            </div>
            <div className='ct-input-holder'>
              <label htmlFor="endDate">Bitmə tarixi:</label>
              <Field type="date" id="endDate" name="endDate" />
              <ErrorMessage name="endDate" component="div" className="error" />
            </div>
            <div className='ct-input-holder'>
              <label htmlFor="address">Ünvan:</label>
              <Field type="text" id="address" name="address" placeholder='Ünvan' />
              <ErrorMessage name="address" component="div" className="error" />
            </div>
            <div className='ct-input-holder'>
              <label htmlFor="price">Qiymət:</label>
              <Field type="number" id="price" name="price" placeholder='Qiymət' />
              <ErrorMessage name="price" component="div" className="error" />
            </div>
            <div className='ct-input-holder'>
              <label htmlFor="files">Faylları əlavə edin:</label>
              <input
                type="file"
                id="files"
                name="files"
                multiple
                onChange={(event) => {
                  handleFileChange(event);
                  setFieldValue('files', event.target.files)
                }}
              />
              {errorMessage && <div className='error-message'>{errorMessage}</div>}
              {files.length > 0 && (
                <ul className='file-names-list'>
                  {files.map((file, index) => (
                    <li key={index}>
                      <strong>Name:</strong> {file.name} <br />
                      <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB <br />
                      <strong>Type:</strong> {file.type}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="submit">Əlavə et</button>
          </Form>
        )}
      </Formik>
    </div>

  )
}

export default CreateTender
