import { pool } from '../db.js';

// Método PUT (Actualizar una nota por su ID)
export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, archived } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE Notes SET title=?, content=?, archived=? WHERE idNotes = ?',
            [title, content, archived, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nota no encontrada' });
        const [rows] = await pool.query('SELECT * FROM Notes WHERE idNotes = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar la nota', error: error.message });
    }
};