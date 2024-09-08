import * as Yup from 'yup';

const validationSchema = Yup.object({
  owner: Yup.string().required('Elan sahibi is required'),
  purpose: Yup.string().required('Elanin məqsədi is required'),
  endDate: Yup.date().required('Bitme tarixi is required').nullable(),
  address: Yup.string().required('Ünvan is required'),
  price: Yup.number().required('Qiymət is required').positive('Qiymət must be positive'),
  files: Yup.mixed().test('fileType', 'Only PDF, Word, and Excel files are allowed', (value) => {
    if (!value || value.length === 0) return true;
    return Array.from(value).every(file => 
      ['application/pdf', 
       'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
       'application/msword', 
       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
       'application/vnd.ms-excel'].includes(file.type)
    );
  }),
});

export default validationSchema;
