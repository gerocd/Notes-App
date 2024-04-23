import { pool } from '../db.js';

// Método POST (Crear una nueva nota)
export const createNote = async (req, res) => {
    const { title, content, archived, category } = req.body; // Asegúrate de recibir el ID de la categoría seleccionada
    try {
        // Insertar la nueva nota en la tabla Notes
        const [noteResult] = await pool.query(
            'INSERT INTO Notes(title, content, archived) VALUES (?,?,?)',
            [title, content, archived]
        );
        const noteId = noteResult.insertId;

        // Establecer la relación entre la nota y la categoría en la tabla Category_Notes
        await pool.query(
            'INSERT INTO Category_Notes (note_id, category_id) VALUES (?, ?)',
            [noteId, category]
        );

        // Devolver la respuesta con la información de la nota creada
        res.status(201).json({
            id: noteId,
            title,
            content,
            archived,
            category // Puedes devolver el ID de la categoría seleccionada si lo deseas
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear la nota', error: error.message });
    }
};
