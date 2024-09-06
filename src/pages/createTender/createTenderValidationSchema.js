import * as Yup from 'yup';

const validationSchema = Yup.object({
  owner: Yup.string().required('Elan sahibi is required'),
  purpose: Yup.string().required('Elanin məqsədi is required'),
  endDate: Yup.date().required('Bitme tarixi is required').nullable(),
  address: Yup.string().required('Ünvan is required'),
  price: Yup.number().required('Qiymət is required').positive('Qiymət must be positive'),
});

export default validationSchema;
