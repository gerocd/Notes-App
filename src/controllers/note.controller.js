import { pool } from '../db.js';

// Método GET (Obtener todas las notas)
export const getNotes = async (req, res) => {
    try {
        console.log('Controlador getNotas se está ejecutando');
        const [rows] = await pool.query('SELECT * FROM Notes');
        res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las notas', error: error.message });
    }
};

// Método GET (Obtener una nota por su ID)
export const getNote = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Notes WHERE idNotes = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({ message: 'Nota no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener la nota', error: error.message });
    }
};



