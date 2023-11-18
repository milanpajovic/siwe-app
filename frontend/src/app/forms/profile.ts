import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export type ProfileDetailsType = {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  contactPhone: string;
};

const defaultValues = {
  name: '',
  address: '',
  postalCode: '',
  city: '',
  email: '',
  contactPhone: '',
};

const phoneRegEx =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{2,3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const validationSchema = yup.object({
  name: yup.string().required('Required'),
  address: yup.string().required('Required'),
  postalCode: yup.string().required('Required'),
  city: yup.string().required('Required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Required')
    .transform((val) => (val === '' ? undefined : val)),
  contactPhone: yup
    .string()
    .matches(phoneRegEx, {
      message: 'Invalid phone number',
      excludeEmptyString: true,
    })
    .required('Required'),
});

const resolver = yupResolver(validationSchema);

export { resolver, defaultValues };
