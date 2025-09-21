import { NoteService } from '../services/note.service.js';

// GET /api/notes - Listar notas activas
export const getNotes = async (req, res) => {
    try {
        const notes = await NoteService.getAllNotes();
        res.json(notes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Error al obtener las notas', 
            error: error.message 
        });
    }
};

// GET /api/notes/archived - Listar notas archivadas
export const getArchivedNotes = async (req, res) => {
    try {
        const notes = await NoteService.getArchivedNotes();
        res.json(notes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Error al obtener las notas archivadas', 
            error: error.message 
        });
    }
};

// GET /api/notes/:id - Obtener una nota por su ID
export const getNote = async (req, res) => {
    try {
        const note = await NoteService.getNoteById(req.params.id);
        res.json(note);
    } catch (error) {
        console.error(error);
        if (error.message === 'Nota no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ 
            message: 'Error al obtener la nota', 
            error: error.message 
        });
    }
};

// POST /api/notes - Crear nota
export const createNote = async (req, res) => {
    try {
        const note = await NoteService.createNote(req.body);
        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ 
            message: 'Error al crear la nota', 
            error: error.message 
        });
    }
};

// PUT /api/notes/:id - Editar nota
export const updateNote = async (req, res) => {
    try {
        const note = await NoteService.updateNote(req.params.id, req.body);
        res.json(note);
    } catch (error) {
        console.error(error);
        if (error.message === 'Nota no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        return res.status(400).json({ 
            message: 'Error al actualizar la nota', 
            error: error.message 
        });
    }
};

// DELETE /api/notes/:id - Eliminar nota
export const deleteNote = async (req, res) => {
    try {
        const result = await NoteService.deleteNote(req.params.id);
        res.json(result);
    } catch (error) {
        console.error(error);
        if (error.message === 'Nota no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ 
            message: 'Error al eliminar la nota', 
            error: error.message 
        });
    }
};

// PATCH /api/notes/:id/archive - Archivar nota
export const archiveNote = async (req, res) => {
    try {
        const note = await NoteService.archiveNote(req.params.id);
        res.json(note);
    } catch (error) {
        console.error(error);
        if (error.message === 'Nota no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'La nota ya está archivada') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ 
            message: 'Error al archivar la nota', 
            error: error.message 
        });
    }
};

// PATCH /api/notes/:id/unarchive - Desarchivar nota
export const unarchiveNote = async (req, res) => {
    try {
        const note = await NoteService.unarchiveNote(req.params.id);
        res.json(note);
    } catch (error) {
        console.error(error);
        if (error.message === 'Nota no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'La nota no está archivada') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ 
            message: 'Error al desarchivar la nota', 
            error: error.message 
        });
    }
};

// GET /api/notes/search?q=term - Buscar notas
export const searchNotes = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: 'Parámetro de búsqueda requerido' });
        }
        const notes = await NoteService.searchNotes(q);
        res.json(notes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Error al buscar notas', 
            error: error.message 
        });
    }
};



