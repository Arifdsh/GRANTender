import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './apply.scss'

const Apply = () => {

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    details: Yup.string().required('Details are required'),
    file: Yup.mixed().required('File is required'),
  });

  // Initial form values
  const initialValues = {
    name: '',
    description: '',
    details: '',
    file: null,
  };

  // Form submission handler
  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div className="apply-tender">
      <h2>Apply for Tender</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="form-container">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field as="textarea" id="description" name="description" rows="4" />
              <ErrorMessage name="description" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="details">Details</label>
              <Field as="textarea" id="details" name="details" rows="4" />
              <ErrorMessage name="details" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="file">Upload File</label>
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