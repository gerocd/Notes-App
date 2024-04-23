import { Router } from "express";

// routes imports
import getNoteRoutes from './note.routes.js'
import addNoteRoutes from './addNote.routes.js'
import categoryNoteRoutes from './categoryNote.routes.js'
import archiveNoteRoutes from './archiveNote.routes.js'
import deleteNoteRoutes from './deleteNote.routes.js'
import editNoteRoutes from './editNote.routes.js'
import searchNotesRoutes from './searchNote.routes.js'

const router = Router();

//Router use
router.use('/api-note', getNoteRoutes);
router.use('/api-note', categoryNoteRoutes);
router.use('/api-note', addNoteRoutes);
router.use('/api-note', archiveNoteRoutes);
router.use('/api-note', deleteNoteRoutes);
router.use('/api-note', editNoteRoutes);
router.use('/api-note', searchNotesRoutes);

export default router