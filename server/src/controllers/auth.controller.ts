import { Request, Response } from 'express';
import { generateNonce, SiweMessage, SiweResponse } from 'siwe';
import { getRpcProvider } from '../config/rpc-provider.config';
import { logger } from 'ethers';

const getNonce = async (req: Request, res: Response) => {
  req.session.nonce = generateNonce();
  await req.session.save();
  res.status(200).send(req.session.nonce);
};

const getSession = async (req: Request, res: Response) => {
  if (!req.session.siwe) {
    return res.send({ ok: false });
  }

  res.send({
    address: req.session.siwe?.address,
    chainId: req.session.siwe?.chainId,
  });
};
const verifySiwe = async (req: Request, res: Response) => {
  const { message, signature } = req.body;

  let siweResponse: SiweResponse;
  try {
    const siweMessage = new SiweMessage(message);
    siweResponse = await siweMessage.verify(
      { signature },
      { provider: getRpcProvider(siweMessage.chainId) }
    );
  } catch (error) {
    logger.info('error', error);
    return res.json({ ok: false });
  }

  if (!siweResponse.success) {
    return res.json({ ok: false });
  }

  req.session.siwe = siweResponse.data;
  await req.session.save();
  res.json({ ok: true });
};

const signOut = async (req: Request, res: Response) => {
  await req.session.destroy();
  return res.json({ ok: true });
};

export { getNonce, getSession, verifySiwe, signOut };
