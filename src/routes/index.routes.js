import { Router } from "express";

// routes imports
import noteRoutes from './note.routes.js'

const router = Router();

// Router use - Todas las rutas de notas bajo /api/notes
router.use('/api/notes', noteRoutes);

export default router