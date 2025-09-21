import { Router } from 'express';
import {
    getNotes,
    getArchivedNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    searchNotes
} from '../controllers/note.controller.js';

const router = Router();

// Rutas REST según especificación
router.get('/', getNotes);                    // GET /api/notes
router.get('/archived', getArchivedNotes);    // GET /api/notes/archived
router.get('/search', searchNotes);           // GET /api/notes/search?q=term
router.get('/:id', getNote);                  // GET /api/notes/:id
router.post('/', createNote);                 // POST /api/notes
router.put('/:id', updateNote);               // PUT /api/notes/:id
router.delete('/:id', deleteNote);            // DELETE /api/notes/:id
router.patch('/:id/archive', archiveNote);    // PATCH /api/notes/:id/archive
router.patch('/:id/unarchive', unarchiveNote); // PATCH /api/notes/:id/unarchive

export default router;