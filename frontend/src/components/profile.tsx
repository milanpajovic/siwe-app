import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export interface UserProfile {
  name: string;
  surname: string;
}

const ProfileComponent = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (address) {
        try {
          const response = await fetch(
            `http://localhost:3001/api/profile?address=${address}`,
            {
              credentials: 'include',
            }
          );
          if (response.ok) {
            const data: UserProfile = await response.json();
            setProfile(data);
          } else {
            console.error('Failed to fetch profile');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
  }, [address]);

  if (!profile) return <div>Loading profile...</div>;

  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div>
      <div>Connected Wallet: {address}</div>
      <div>Profile Name: {profile.name}</div>
      <div>Profile Email: {profile.name}</div>
      {/* Display other profile details here */}
    </div>
  );
};

export default ProfileComponent;
