import {Router} from 'express';
import { mysqlRouter } from './hello';

export const router = Router();

router.use(mysqlRouter);
