import { Router } from 'express';
import {searchNotes} from '../controllers/searchNote.controller.js';

const router = Router();

router.get('/search/:id', searchNotes)

export default router;