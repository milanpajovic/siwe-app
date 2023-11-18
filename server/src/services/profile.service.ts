import Profile from '../models/Profile.model';
import { UpdateProfileRequest } from '../controllers/profile.controller';

const createProfile = async (
  profile: UpdateProfileRequest,
  walletAddress: string
): Promise<Profile> => {
  return Profile.create({
    username: profile.name,
    wallet_address: walletAddress,
    email: profile.profile.email,
    phone: profile.profile.contactPhone,
    address: profile.profile.location.address,
    postal_code: profile.profile.location.postalCode,
    city: profile.profile.location.city,
  });
};

const findProfileByWalletAddress = async (
  walletAddress: string
): Promise<Profile> => {
  return Profile.findOne({
    where: {
      wallet_address: walletAddress,
    },
  });
};

const updateProfile = async (
  profile: Profile,
  profileUpdate: UpdateProfileRequest
): Promise<Profile> => {
  profile.username = profileUpdate.name;
  profile.email = profileUpdate.profile.email;
  profile.phone = profileUpdate.profile.contactPhone;
  profile.address = profileUpdate.profile.location.address;
  profile.postal_code = profileUpdate.profile.location.postalCode;
  profile.city = profileUpdate.profile.location.city;

  await profile.save();
  return profile;
};

export default {
  createProfile,
  findProfileByWalletAddress,
  updateProfile,
};
