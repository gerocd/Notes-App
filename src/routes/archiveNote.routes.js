import { Router } from 'express';
import {archiveNote, unarchiveNote, getArchivedNotes} from '../controllers/archiveNote.controlle.js';

const router = Router();

router.put('/archived/:id', archiveNote)

router.put('/unarchived/:id', unarchiveNote)

router.get('/getarchived', getArchivedNotes)

export default router;