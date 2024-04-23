import { Router } from 'express';
import {getNote, getNotes} from '../controllers/note.controller.js';

const router = Router();

router.get('/get-note/:id', getNote) 
router.get('/get-all-notes', getNotes) 

export default router;