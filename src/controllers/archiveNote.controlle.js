import { pool } from '../db.js';

// Método PUT (Archivar una nota por su ID)
export const archiveNote = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query(
            'UPDATE Notes SET archived=true WHERE idNotes = ?',
            [id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nota no encontrada' });
        const [rows] = await pool.query('SELECT * FROM Notes WHERE idNotes = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al archivar la nota', error: error.message });
    }
};

// Método PUT (Desarchivar una nota por su ID)
export const unarchiveNote = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query(
            'UPDATE Notes SET archived=false WHERE idNotes = ?',
            [id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nota no encontrada' });
        const [rows] = await pool.query('SELECT * FROM Notes WHERE idNotes = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al desarchivar la nota', error: error.message });
    }
};

// Método GET para obtener todas las notas archivadas
export const getArchivedNotes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Notes WHERE archived=true');
        res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las notas archivadas', error: error.message });
    }
};

