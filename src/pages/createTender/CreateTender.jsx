import React from 'react'
import './createTender.scss'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import validationSchema from './createTenderValidationSchema';

const CreateTender = () => {
  return (
    <div className='ct-main-area'>
    <Formik
      initialValues={{ owner: '', purpose: '', endDate: '', address: '', price: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        alert('Create Tender Form Submitted: ' + JSON.stringify(values, null, 2));
      }}
    >
      <Form className='ct-form'>
        <div className='ct-input-holder'>
          <label htmlFor="owner">Elan sahibi:</label>
          <Field type="text" id="owner" name="owner" placeholder='Elan sahibi' />
          <ErrorMessage name="owner" component="div" className="error" />
        </div>
        <div className='ct-input-holder'>
          <label htmlFor="purpose">Elanin məqsədi:</label>
          <Field as="textarea" id="purpose" name="purpose" placeholder='Elanin məqsədi'/>
          <ErrorMessage name="purpose" component="div" className="error" />
        </div>
        <div className='ct-input-holder'>
          <label htmlFor="endDate">Bitme tarixi:</label>
          <Field type="date" id="endDate" name="endDate"/>
          <ErrorMessage name="endDate" component="div" className="error" />
        </div>
        <div className='ct-input-holder'>
          <label htmlFor="address">Ünvan:</label>
          <Field type="text" id="address" name="address" placeholder='Ünvan'/>
          <ErrorMessage name="address" component="div" className="error" />
        </div>
        <div className='ct-input-holder'>
          <label htmlFor="price">Qiymət:</label>
          <Field type="number" id="price" name="price" placeholder='Qiymət'/>
          <ErrorMessage name="price" component="div" className="error" />
        </div>
        <button type="submit">Elave et</button>
      </Form>
    </Formik>
    </div>
  )
}

export default CreateTender