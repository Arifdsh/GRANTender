import * as Yup from 'yup';

export const profileEditSchema = Yup.object({
  name: Yup.string().required('Ad tələb olunur'),
  surname: Yup.string().required('Soyad tələb olunur'),
  oldPassword: Yup.string().optional(),
  newPassword: Yup.string()
    .min(6, 'Yeni şifrə ən azı 6 simvol olmalıdır')
    .optional(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Yeni şifrə və təsdiq eyni olmalıdır')
    .optional(),
});