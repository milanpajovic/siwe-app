import { useSIWE } from 'connectkit';
import ProfileDetails from '../../components/organism/ProfileDetails';
import InfoModal from '../../components/atom/InfoModal';

const DashboardPage = () => {
  const { isSignedIn} = useSIWE();
  return <>{isSignedIn ? <ProfileDetails /> : <InfoModal />}</>;
};

export default DashboardPage;
