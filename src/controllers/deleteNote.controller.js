import { pool } from '../db.js';

// Método DELETE (Eliminar una nota por su ID)
export const deleteNote = async (req, res) => {
    try {
        // Realiza una consulta SELECT para verificar si la nota existe
        const [rows] = await pool.query('SELECT * FROM Notes WHERE idNotes = ?', [req.params.id]);

        // Verifica si la nota existe
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }

        // Si la nota existe, procede a eliminarla
        const [result] = await pool.query('DELETE FROM Notes WHERE idNotes = ?', [req.params.id]);

        if (result.affectedRows <= 0) {
            return res.status(500).json({ message: 'Error al eliminar la nota', error: error.message });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar la nota', error: error.message });
    }
};