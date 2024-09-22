import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import applyShema from './applySchema.js';
import './apply.scss';
import { useDispatch, useSelector } from 'react-redux';
import { submitApplyList } from '../../features/applySlice.js';
import { selectSelectedTenderId, selectSelectedTenderOwnerId } from '../../features/tendersSlice.js';
import { applyForTender, checkLoggedInUser } from '../../features/usersSlice.js';
import { IoCloseCircle } from 'react-icons/io5';

const Apply = () => {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch()

  const selectedTenderId = useSelector(selectSelectedTenderId);
  const tenderOwnerId = useSelector(selectSelectedTenderOwnerId)
  const loggedInUser = useSelector((state) => state.user.user)
  

  useEffect(() => {
    dispatch(checkLoggedInUser())
  }, [])

  const initialValues = {
    name: '',
    description: '',
    details: '',
    userId: loggedInUser?.id || '',
    cardId: selectedTenderId || '',
    tenderOwnerId: tenderOwnerId || '',
    file: [],
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve({ name: file.name, size: file.size, type: file.type, base64: reader.result });
      reader.onerror = (error) => reject(error);
    });
  };


// const handleSubmit =  (values, { resetForm }) => {
//   const formData = {
//     ...values,
//     // file: values.file ? await convertFileToBase64(values.file) : null,
//   };
//   dispatch(submitApplyList(formData))
//   dispatch(applyForTender({ userId: loggedInUser?.id, tenderId: selectedTenderId }))
//   resetForm()
// }

const handleFileChange = async (event) => {
  const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
  const uploadedFiles = Array.from(event.target.files);

  // Filter and convert files to base64
  const filteredFiles = uploadedFiles.filter((file) => allowedTypes.includes(file.type));

  if (filteredFiles.length < uploadedFiles.length) {
    setErrorMessage('Only PDF and Word files are allowed.');
  } else {
    setErrorMessage('');
  }

  const base64Files = await Promise.all(filteredFiles.map((file) => convertFileToBase64(file)));
  setFiles((prevFiles) => [...prevFiles, ...base64Files]);
};

return (
  <div className="apply-tender">
    <IoCloseCircle className="close" />
    <h2>MÜRACİƏT FORMU</h2>
    <Formik
      initialValues={initialValues}
      validationSchema={applyShema}
      //onSubmit={handleSubmit}
      onSubmit={(values, { resetForm }) => {
        const formData = {
          ...values,
          file: files,
        };

        dispatch(submitApplyList(formData));
        dispatch(applyForTender({ userId: loggedInUser?.id, tenderId: selectedTenderId }));
        setFiles([]);
        resetForm();
      }}
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
            <label htmlFor="file" className='fileLabel'>Fayl yüklə</label>
            <input
              type="file"
              id="file"
              name="file"
              multiple
              onChange={(event) => {
                handleFileChange(event);
                  setFieldValue('file', event.target.files);
              }}
            />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
              {files.length > 0 && (
                <ul className="file-names-list">
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
          <button type="submit" className="submit-button">Göndər</button>
        </Form>
      )}
    </Formik>
  </div>
);
};

export default Apply;
