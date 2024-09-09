import * as Yup from 'yup';

const is18YearsOld = (value) => {
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    return (
      age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && today.getDate() >= birthDate.getDate())))
    );
  };
  

export const AuthorizationSchema=Yup.object().shape({

    name:Yup.string().min(3).max(15).required().matches(/^[A-Za-z]+$/, 'Ancaq hərf daxil edilməlidir'),
    surname:Yup.string().min(3).max(20).required().matches(/^[A-Za-z]+$/, 'Ancaq hərf daxil edilməlidir'),
    email: Yup.string().email('invalid email').required(),
    age : Yup.date().required().test('18 yaş və ya üzəri olmalıdır', value=>is18YearsOld(value)),
    password : Yup.string().required().min(3).max(10),
    confirmPassword : Yup.string().required().oneOf([Yup.ref('password') ,] , 'sifre eyni deyil')
})

