import { useTranslation } from 'react-i18next';
import ProfileDetailsForm from '../ProfileForm';
import Loader from '../../atom/Loader';
import { useProfileQuery } from '../../../app/queries/UseProfileQuery';
import ShadowBox from '../../atom/ShadowBox';
const ProfileDetails = () => {
  const { t } = useTranslation();
  const { data: profile, isLoading: isLoadingProfile } = useProfileQuery();
  return (
    <>
      <div className="flex items-center justify-center py-6 text-center">
      <ShadowBox title={t('Profile details')}>
        {isLoadingProfile ? <Loader /> : <ProfileDetailsForm data={profile} />}
      </ShadowBox>
      </div>
    </>
  );
};

export default ProfileDetails;
