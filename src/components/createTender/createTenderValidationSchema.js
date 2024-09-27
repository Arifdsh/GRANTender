import * as Yup from 'yup';

const validationSchema = Yup.object({
  owner: Yup.string().required('Elan sahibi bildirilməlidir'),
  subject: Yup.string().required('Elanin məqsədi  bildirilməlidir'),
  endDate: Yup.date().required('Bitme tarixi bildirilməlidir').nullable(),
  address: Yup.string().required('Ünvan bildirilməlidir'),
  price: Yup.number().required('Qiymət bildirilməlidir').positive('Təyin edə bilməzsiniz'),
  city: Yup.string().required('Şəhər gostərilməlidir'),
  files: Yup.mixed().test('fileType', 'Ancaq PDF, Word və Excel fayllara icazə verilir', (value) => {
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
