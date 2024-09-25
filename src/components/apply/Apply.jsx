import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import applyShema from './applySchema.js';
import './apply.scss';
import { useDispatch, useSelector } from 'react-redux';
import { submitApplyList } from '../../features/applySlice.js';
import { selectSelectedTenderId, selectSelectedTenderOwnerId } from '../../features/tendersSlice.js';
import { applyForTender, checkLoggedInUser } from '../../features/usersSlice.js';
import { IoCloseCircle } from 'react-icons/io5';

const Apply = ({ onClose }) => {
  const dispatch = useDispatch();

  const selectedTenderId = useSelector(selectSelectedTenderId);
  const tenderOwnerId = useSelector(selectSelectedTenderOwnerId);
  const loggedInUser = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(checkLoggedInUser());
  }, [dispatch]);

  const initialValues = {
    name: '',
    description: '',
    details: '',
    userId: loggedInUser?.id || '',
    cardId: selectedTenderId || '',
    tenderOwnerId: tenderOwnerId || '',
    file: null,
  };

  const handleSubmit = (values, { resetForm }) => {
    const formData = {
      ...values,
      file: values.file ? values.file.name : null,
    };

    dispatch(submitApplyList(formData));
    dispatch(applyForTender({ userId: loggedInUser?.id, tenderId: selectedTenderId }));
    resetForm();
    onClose(); 
  };

  return (
    <div className="apply-tender">
      <IoCloseCircle className="close" onClick={onClose} />
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
              <label htmlFor="file" className="fileLabel">Fayl Yüklə</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={(event) => setFieldValue('file', event.currentTarget.files[0])}
              />
              <ErrorMessage name="file" component="div" className="error-message" />
            </div>
            <button type="submit" className="submit-button">Göndər</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Apply;
