import { Router } from 'express';
import {createNote} from '../controllers/addNote.controller.js';

const router = Router();

router.post('/add-note', createNote)

export default router;