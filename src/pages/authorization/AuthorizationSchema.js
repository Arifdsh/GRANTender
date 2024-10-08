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

    name:Yup.string().trim().min(3,"Minimum 3 hərf daxil edilməlidir").max(15,"Maksimum uzunluq 15 herf ola biler").required("Ad daxil edilməlidir").matches(/^[A-Za-z]+$/, 'Ancaq hərf daxil edilməlidir'),
    surname:Yup.string().trim().min(3,"Minimum 3 hərf daxil edilməlidir").max(20,"Maksimum uzunluq 20 herf ola biler").required("Soyad daxil edilməlidir").matches(/^[A-Za-z]+$/, 'Ancaq hərf daxil edilməlidir'),
    email: Yup.string().trim().email('Yanlış email').matches(/^[\w-.]+@([\w-]+\.)+([a-zA-Z]{2,4})$/, 'Yanlış email').required("Email daxil edilməlidir"),
    age : Yup.date().required("Yaş daxil edilməlidir").test('18 yaş və ya üzəri olmalıdır', value=>is18YearsOld(value)),
    password : Yup.string().trim().required("Password daxil edilməlidir").min(6,"Minimum 6 simvol daxil edilməlidir").max(15,"Maksimum 15 simvol daxil edilməlidir"),
    confirmPassword : Yup.string().required("Təkrar password daxil edilməlidir").oneOf([Yup.ref('password') ,] , 'Şifrə eyni deyil')
})

