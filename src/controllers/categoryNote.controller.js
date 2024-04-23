import { pool } from "../db.js";


// Método POST (Añadir una nueva categoría)
export const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
      console.log("Controlador addCategory se está ejecutando");
      await pool.query(
        "INSERT INTO Categories (name) VALUES (?)",
        [name]
      );
      res
        .status(201)
        .json({ message: "Categoría añadida correctamente" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({
          message: "Error al añadir la categoría",
          error: error.message,
        });
    }
  };
  

// Método POST (Añadir una categoría a una nota)
export const addCategoryToNote = async (req, res) => {
  const { note_id, category_id } = req.body;
  try {
    console.log("Controlador addCategoryToNote se está ejecutando");
    await pool.query(
      "INSERT INTO Category_Notes (note_id, category_id) VALUES (?, ?)",
      [note_id, category_id]
    );
    res
      .status(201)
      .json({ message: "Categoría añadida a la nota correctamente" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Error al añadir la categoría a la nota",
        error: error.message,
      });
  }
};

// Método DELETE (Eliminar una categoría de una nota)
export const removeCategoryFromNote = async (req, res) => {
  const { note_id, category_id } = req.body;
  try {
    console.log("Controlador removeCategoryFromNote se está ejecutando");
    await pool.query(
      "DELETE FROM Category_Notes WHERE note_id = ? AND category_id = ?",
      [note_id, category_id]
    );
    res.json({ message: "Categoría eliminada de la nota correctamente" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Error al eliminar la categoría de la nota",
        error: error.message,
      });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    console.log("Controlador getAllCategories se está ejecutando");
    const [rows] = await pool.query(
      "SELECT * FROM Categories"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Error al obtener todas las categorías",
        error: error.message,
      });
  }
};

// Método GET (Obtener notas por categoría)
export const getNotesByCategory = async (req, res) => {
  const { category_id } = req.params;
  try {
    console.log("Controlador getNotesByCategory se está ejecutando");
    const [rows] = await pool.query(
      "SELECT Notes.* FROM Notes JOIN Category_Notes ON Notes.idNotes = Category_Notes.note_id WHERE Category_Notes.category_id = ?",
      [category_id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Error al obtener las notas por categoría",
        error: error.message,
      });
  }
};
