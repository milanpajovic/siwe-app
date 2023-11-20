import { Router } from 'express';
const router = Router();

const version = '1.0.2'
router.get('/', (req, res) => {
  res.send({ ok: true, version: version });
});

export default router;
