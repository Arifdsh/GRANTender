import React, { useState } from 'react'
import './createTender.scss'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import validationSchema from './createTenderValidationSchema';

const CreateTender = () => {
  const [files, setFiles] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileChange = (event) => {
    const allowedTypes = [
      'application/pdf', // PDF
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word
      'application/msword', // Older Word format
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel
      'application/vnd.ms-excel', // Older Excel format
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
        initialValues={{ owner: '', purpose: '', endDate: '', address: '', price: '', files: [] }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          alert('Create Tender Form Submitted: ' + JSON.stringify(values, null, 2))
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
              <label htmlFor="purpose">Elanin məqsədi:</label>
              <Field as="textarea" id="purpose" name="purpose" placeholder='Elanin məqsədi' />
              <ErrorMessage name="purpose" component="div" className="error" />
            </div>
            <div className='ct-input-holder'>
              <label htmlFor="endDate">Bitme tarixi:</label>
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
            <button type="submit">Elave et</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateTender
