import { pool } from '../db.js';

// Método GET para buscar notas por título o contenido
export const searchNotes = async (req, res) => {
    const { keyword } = req.query;
  
    try {
      const [rows] = await pool.query(
        'SELECT * FROM Notes WHERE title LIKE ? OR content LIKE ?',
        [`%${keyword}%`, `%${keyword}%`]
      );
  
      res.json(rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al buscar las notas', error: error.message });
    }
};
