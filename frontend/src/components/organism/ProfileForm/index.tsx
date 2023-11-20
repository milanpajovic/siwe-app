import Button from '../../atom/Button';
import Input from '../../atom/Input';
import { useTranslation } from 'react-i18next';
import { useController, useForm } from 'react-hook-form';
import Errors from '../../atom/Errors';
import { useProfileMutation } from '../../../app/queries/useProfileMutation';
import { ProfileDetailsType, resolver } from '../../../app/forms/profile';
import { toast } from 'react-hot-toast';
import { ProfileObject } from '../../../app/queries/UseProfileQuery';

interface ProfileDetailFormProps {
  data: ProfileObject;
}

const ProfileDetailsForm = ({ data }: ProfileDetailFormProps) => {
  const { t } = useTranslation();
  const { mutateAsync } = useProfileMutation();

  const prepareDefaultValues = () => {
    const {
      name,
      profile: { location, contactPhone, email },
    } = data;

    return {
      name: name,
      address: location?.address ?? '',
      postalCode: location?.postalCode ?? '',
      city: location?.city ?? '',
      email: email ?? '',
      contactPhone: contactPhone ?? '',
    };
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileDetailsType>({
    resolver,
    defaultValues: prepareDefaultValues(),
  });

  const { field: nameField } = useController({ name: 'name', control });
  const { field: addressField } = useController({ name: 'address', control });
  const { field: postalCodeField } = useController({
    name: 'postalCode',
    control,
  });
  const { field: cityField } = useController({ name: 'city', control });
  const { field: emailField } = useController({ name: 'email', control });
  const { field: contactPhoneField } = useController({
    name: 'contactPhone',
    control,
  });

  const onSubmit = (data: ProfileDetailsType) => {
    mutateAsync({
      name: data.name,
      profile: {
        location: {
          address: data.address,
          postalCode: data.postalCode,
          city: data.city,
        },
        email: data.email,
        contactPhone: data.contactPhone,
      },
    })
      .then(() => {
        toast.success(t('Updated!'));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-5 mt-2">{t('Here you can find your profile details')}</p>

      <div className="flex items-center gap-6 py-9">
        <div className="grid w-80 grid-cols-2">
          <div>
            <Input
              {...nameField}
              value={nameField.value}
              label={t('Username')}
              placeholder={t('Username')}
              className="w-80"
            />
            <Errors name="name" errors={errors} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 pb-9 pt-4">
        <div className="grid w-80 grid-cols-2">
          <div>
            <Input
              {...emailField}
              label={t('Contact email')}
              placeholder={t('Contact email')}
              className="w-80"
            />
            <Errors name="email" errors={errors} />
          </div>
        </div>
        <div className="grid w-80 grid-cols-2">
          <div>
            <Input
              {...contactPhoneField}
              label={t('Contact phone number')}
              placeholder={t('Contact phone number')}
              className="w-80"
            />
            <Errors name="contactPhone" errors={errors} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 py-4">
        <div className="grid w-80 grid-cols-2">
          <div>
            <Input
              {...addressField}
              label={t('Street address')}
              placeholder={t('Street address')}
              className="w-80"
            />
            <Errors name="address" errors={errors} />
          </div>
        </div>
        <div className="grid w-40 grid-cols-2">
          <div>
            <Input
              {...postalCodeField}
              label={t('Postal code')}
              placeholder={t('Postal code')}
              className="w-40"
            />
            <Errors name="postalCode" errors={errors} />
          </div>
        </div>
        <div className="grid w-56 grid-cols-2">
          <div>
            <Input
              {...cityField}
              label={t('City')}
              placeholder={t('City')}
              className="w-56"
            />
            <Errors name="city" errors={errors} />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 py-4">
        <Button
          variant="secondary"
          type="button"
          disabled={!isDirty}
          className="w-40"
          onClick={() => reset(prepareDefaultValues)}
        >
          {t('Reset')}
        </Button>
        <Button
          type="submit"
          disabled={!isDirty}
          variant="primary"
          className="w-40"
        >
          {t('Save changes')}
        </Button>
      </div>
    </form>
  );
};

export default ProfileDetailsForm;
