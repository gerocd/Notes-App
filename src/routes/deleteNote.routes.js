import { Router } from 'express';
import {deleteNote} from '../controllers/deleteNote.controller.js';

const router = Router();

router.delete('/delete/:id', deleteNote)

export default router;