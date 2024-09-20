import React, { useState, useEffect } from 'react'
import './createTender.scss'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { IoCloseCircle } from "react-icons/io5";
import validationSchema from './createTenderValidationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { clearTenderToEdit, createTender, hideCreateTenderForm, updateTender } from '../../features/tendersSlice.js';

const CreateTender = () => {
  const [files, setFiles] = useState([])
  const [errorMessage, setErrorMessage] = useState('')


  const dispatch = useDispatch()
  const tenderToEdit = useSelector((state) => state.tenders.tenderToEdit)
  const loggedInUser = useSelector((state)=>(state.user.user))

  const initialValues = tenderToEdit
    ? { owner: tenderToEdit.owner, subject: tenderToEdit.subject, endDate: tenderToEdit.expirationDate, address: tenderToEdit.address, price: tenderToEdit.price, city: tenderToEdit.city, files: tenderToEdit.files }
    : { owner: '', subject: '', endDate: '', address: '', price: '', city: '', files: [] };


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

  const handleClose = () => {
    dispatch(hideCreateTenderForm())
    dispatch(clearTenderToEdit())
  }


  return (
    <div className='ct-main-area'>
      <button className='close' type='button' onClick={handleClose}>bagla</button>
      <IoCloseCircle onClick={handleClose} className="close" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {

          const currentDate = new Date().toISOString().split('T')[0]
         
          const userId = loggedInUser?.id || null

          const newTender = {
            owner: values.owner,
            subject: values.subject,
            address: values.address,
            price: values.price,
            creationDate: tenderToEdit ? tenderToEdit.creationDate : currentDate,
            expirationDate: values.endDate,
            city: values.city,
            userId: userId,
            files: files,
          }

          if (tenderToEdit) {
            dispatch(updateTender({ id: tenderToEdit.id, updatedData: newTender }));
            dispatch(clearTenderToEdit())
            resetForm()
            setFiles([])
          } else {
            dispatch(createTender(newTender))
          }

          resetForm()
          setFiles([])
          dispatch(hideCreateTenderForm())
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
                <option value="Bakı">Bakı</option>
                <option value="Cəlilabad">Cəlilabad</option>
                <option value="Gəncə">Gəncə</option>
                <option value="Kürdəmir">Kürdəmir</option>
                <option value="Naxçıvan">Naxçıvan</option>
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
            <button type="submit">{tenderToEdit ?  'Yenilənmə' : 'Əlavə et' }</button>
          </Form>
        )}
      </Formik>
    </div>

  )
}

export default CreateTender
