import { NoteRepository } from '../repositories/note.repository.js';

export class NoteService {
    // Obtener todas las notas activas
    static async getAllNotes() {
        try {
            return await NoteRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener las notas: ${error.message}`);
        }
    }

    // Obtener todas las notas archivadas
    static async getArchivedNotes() {
        try {
            return await NoteRepository.findAllArchived();
        } catch (error) {
            throw new Error(`Error al obtener las notas archivadas: ${error.message}`);
        }
    }

    // Obtener una nota por ID
    static async getNoteById(id) {
        try {
            const note = await NoteRepository.findById(id);
            if (!note) {
                throw new Error('Nota no encontrada');
            }
            return note;
        } catch (error) {
            throw new Error(`Error al obtener la nota: ${error.message}`);
        }
    }

    // Crear una nueva nota
    static async createNote(noteData) {
        try {
            // Validaciones de negocio
            if (!noteData.title || noteData.title.trim().length === 0) {
                throw new Error('El título es requerido');
            }
            if (!noteData.content || noteData.content.trim().length === 0) {
                throw new Error('El contenido es requerido');
            }
            if (noteData.title.length > 100) {
                throw new Error('El título no puede exceder 100 caracteres');
            }

            const noteId = await NoteRepository.create(noteData);
            return await NoteRepository.findById(noteId);
        } catch (error) {
            throw new Error(`Error al crear la nota: ${error.message}`);
        }
    }

    // Actualizar una nota
    static async updateNote(id, noteData) {
        try {
            // Verificar que la nota existe
            const existingNote = await NoteRepository.findById(id);
            if (!existingNote) {
                throw new Error('Nota no encontrada');
            }

            // Validaciones de negocio
            if (noteData.title && noteData.title.trim().length === 0) {
                throw new Error('El título no puede estar vacío');
            }
            if (noteData.content && noteData.content.trim().length === 0) {
                throw new Error('El contenido no puede estar vacío');
            }
            if (noteData.title && noteData.title.length > 100) {
                throw new Error('El título no puede exceder 100 caracteres');
            }

            const success = await NoteRepository.update(id, noteData);
            if (!success) {
                throw new Error('No se pudo actualizar la nota');
            }

            return await NoteRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al actualizar la nota: ${error.message}`);
        }
    }

    // Eliminar una nota
    static async deleteNote(id) {
        try {
            // Verificar que la nota existe
            const existingNote = await NoteRepository.findById(id);
            if (!existingNote) {
                throw new Error('Nota no encontrada');
            }

            const success = await NoteRepository.delete(id);
            if (!success) {
                throw new Error('No se pudo eliminar la nota');
            }

            return { message: 'Nota eliminada exitosamente' };
        } catch (error) {
            throw new Error(`Error al eliminar la nota: ${error.message}`);
        }
    }

    // Archivar una nota
    static async archiveNote(id) {
        try {
            // Verificar que la nota existe
            const existingNote = await NoteRepository.findById(id);
            if (!existingNote) {
                throw new Error('Nota no encontrada');
            }

            if (existingNote.archived) {
                throw new Error('La nota ya está archivada');
            }

            const success = await NoteRepository.archive(id);
            if (!success) {
                throw new Error('No se pudo archivar la nota');
            }

            return await NoteRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al archivar la nota: ${error.message}`);
        }
    }

    // Desarchivar una nota
    static async unarchiveNote(id) {
        try {
            // Verificar que la nota existe
            const existingNote = await NoteRepository.findById(id);
            if (!existingNote) {
                throw new Error('Nota no encontrada');
            }

            if (!existingNote.archived) {
                throw new Error('La nota no está archivada');
            }

            const success = await NoteRepository.unarchive(id);
            if (!success) {
                throw new Error('No se pudo desarchivar la nota');
            }

            return await NoteRepository.findById(id);
        } catch (error) {
            throw new Error(`Error al desarchivar la nota: ${error.message}`);
        }
    }

    // Buscar notas
    static async searchNotes(searchTerm) {
        try {
            if (!searchTerm || searchTerm.trim().length === 0) {
                throw new Error('El término de búsqueda es requerido');
            }

            return await NoteRepository.search(searchTerm);
        } catch (error) {
            throw new Error(`Error al buscar notas: ${error.message}`);
        }
    }
}
