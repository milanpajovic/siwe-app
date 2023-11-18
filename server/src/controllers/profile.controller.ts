import { Request, Response } from 'express';
import Profile from '../models/Profile.model';

const getProfile = async (req: Request, res: Response) => {
  const profile = {
    name: 'Example Username',
    profile: {
      location: '1234 Example Street, Example City, EX 12345',
      contactPhone: '+1-234-567-8901',
      email: 'contact@example.com',
    },
  };

  let result = await Profile.findAndCountAll({
  });

  return res.send(profile);
};

const updateProfile = (req: Request, res: Response) => {
  console.log(req.body);
  const profile = {
    name: 'Example Username',
    profile: {
      location: '1234 Example Street, Example City, EX 12345',
      contactPhone: '+1-234-567-8901',
      email: 'contact@example.com',
    },
  };
  return res.send(profile);
};

export { getProfile, updateProfile};
