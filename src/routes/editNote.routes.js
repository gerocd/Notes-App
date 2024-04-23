import { Router } from 'express';
import {updateNote} from '../controllers/editNote.controller.js';

const router = Router();

router.put('/edit/:id', updateNote)

export default router;