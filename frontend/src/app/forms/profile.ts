import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export type ProfileDetailsType = {
  name: string;
  country: string;
  address: string;
  postalCode: string;
  city: string;
  region: string;
  email: string;
  contactPhone: string;
};

const defaultValues = {
  name: '',
  country: '',
  address: '',
  postalCode: '',
  city: '',
  region: '',
  email: '',
  contactPhone: '',
};

const phoneRegEx =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{2,3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const validationSchema = yup.object({
  name: yup.string().required('Required'),
  country: yup.string(),
  address: yup.string(),
  postalCode: yup.string(),
  city: yup.string(),
  region: yup.string(),
  email: yup
    .string()
    .email('Invalid email address')
    .notRequired()
    .transform((val) => (val === '' ? undefined : val)),
  contactPhone: yup
    .string()
    .matches(phoneRegEx, {
      message: 'Invalid phone number',
      excludeEmptyString: true,
    }),
});

const resolver = yupResolver(validationSchema);

export { resolver, defaultValues };
