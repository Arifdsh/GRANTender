import * as Yup from 'yup';

export const profileEditSchema = Yup.object({
  name: Yup.string().required('Ad tələb olunur'),
  surname: Yup.string().required('Soyad tələb olunur'),
  oldPassword: Yup.string().when([], {
    is: (showPasswordFields) => showPasswordFields === true,
    then: Yup.string().required('Köhnə şifrə tələb olunur'),
  }),
  newPassword: Yup.string().when([], {
    is: (showPasswordFields) => showPasswordFields === true,
    then: Yup.string().min(6, 'Yeni şifrə ən azı 6 simvol olmalıdır').required('Yeni şifrə tələb olunur'),
  }),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Yeni şifrə və təsdiq eyni olmalıdır')
    .when([], {
      is: (showPasswordFields) => showPasswordFields === true,
      then: Yup.string().required('Təsdiq şifrə tələb olunur'),
    }),
});