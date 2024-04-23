import { Router } from "express";
import {
    addCategory,
  addCategoryToNote,
  removeCategoryFromNote,
  getAllCategories,
  getNotesByCategory,
} from "../controllers/categoryNote.controller.js";

const router = Router();
router.post('/add-category', addCategory);
router.post("/add-category-tonote", addCategoryToNote);
router.delete("/delete-category/:id", removeCategoryFromNote);
router.get("/get-all-categories", getAllCategories);
router.get("/get-category/:id", getNotesByCategory);

export default router;
