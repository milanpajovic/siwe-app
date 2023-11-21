import { Request, Response } from 'express';
import profileService from '../services/profile.service';
interface Location {
  address: string;
  postalCode: string;
  city: string;
}

interface ProfileInterface {
  location: Location;
  email: string;
  contactPhone: string;
}

export interface ProfileObject {
  name: string;
  profile: ProfileInterface;
}

const getProfile = async (req: Request, res: Response) => {
  const walletAddress = req.session.siwe.address;
  const profile = await profileService.findProfileByWalletAddress(
    walletAddress
  );

  if (!profile) {
    return res.send({
      name: '',
      profile: {
        location: {
          address: '',
          postalCode: '',
          city: '',
        },
        contactPhone: '',
        email: '',
      },
    } as ProfileObject);
  }

  return res.send({
    name: profile.username,
    profile: {
      location: {
        address: profile.address,
        postalCode: profile.postal_code,
        city: profile.city,
      },
      contactPhone: profile.phone,
      email: profile.email,
    },
  } as ProfileObject);
};

const updateProfile = async (req: Request, res: Response) => {
  const walletAddress = req.session.siwe.address;
  const data = req.body as ProfileObject;

  let profile = await profileService.findProfileByWalletAddress(walletAddress);

  if (!profile) {
    profile = await profileService.createProfile(data, walletAddress);
    return res.send(profile);
  }

  profile = await profileService.updateProfile(profile, data);

  res.send({
    name: profile.username,
    profile: {
      location: {
        address: profile.address,
        postalCode: profile.postal_code,
        city: profile.city,
      },
      contactPhone: profile.phone,
      email: profile.email,
    },
  } as ProfileObject);
};

export { getProfile, updateProfile };
