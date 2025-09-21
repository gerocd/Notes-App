import { pool } from '../db.js';

export class NoteRepository {
    // Obtener todas las notas activas
    static async findAll() {
        const [rows] = await pool.query(
            'SELECT * FROM Notes WHERE archived = FALSE ORDER BY updatedAt DESC'
        );
        return rows;
    }

    // Obtener todas las notas archivadas
    static async findAllArchived() {
        const [rows] = await pool.query(
            'SELECT * FROM Notes WHERE archived = TRUE ORDER BY updatedAt DESC'
        );
        return rows;
    }

    // Obtener una nota por ID
    static async findById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM Notes WHERE idNotes = ?',
            [id]
        );
        return rows[0];
    }

    // Crear una nueva nota
    static async create(noteData) {
        const { title, content, archived = false } = noteData;
        const [result] = await pool.query(
            'INSERT INTO Notes (title, content, archived) VALUES (?, ?, ?)',
            [title, content, archived]
        );
        return result.insertId;
    }

    // Actualizar una nota
    static async update(id, noteData) {
        const { title, content, archived } = noteData;
        const [result] = await pool.query(
            'UPDATE Notes SET title = ?, content = ?, archived = ?, updatedAt = CURRENT_TIMESTAMP WHERE idNotes = ?',
            [title, content, archived, id]
        );
        return result.affectedRows > 0;
    }

    // Eliminar una nota
    static async delete(id) {
        const [result] = await pool.query(
            'DELETE FROM Notes WHERE idNotes = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    // Archivar una nota
    static async archive(id) {
        const [result] = await pool.query(
            'UPDATE Notes SET archived = TRUE, updatedAt = CURRENT_TIMESTAMP WHERE idNotes = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    // Desarchivar una nota
    static async unarchive(id) {
        const [result] = await pool.query(
            'UPDATE Notes SET archived = FALSE, updatedAt = CURRENT_TIMESTAMP WHERE idNotes = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    // Buscar notas por término
    static async search(searchTerm) {
        const [rows] = await pool.query(
            'SELECT * FROM Notes WHERE (title LIKE ? OR content LIKE ?) AND archived = FALSE ORDER BY updatedAt DESC',
            [`%${searchTerm}%`, `%${searchTerm}%`]
        );
        return rows;
    }
}
