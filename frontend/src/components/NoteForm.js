import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NoteService } from '../services/NoteService';
import { CategoryService } from '../services/CategoryService';

const NoteForm = ({ onNoteCreated, onNoteUpdated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    archived: false,
    category: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingNote, setLoadingNote] = useState(isEditing);

  useEffect(() => {
    loadCategories();
    if (isEditing) {
      loadNote();
    }
  }, [id]);

  const loadCategories = async () => {
    try {
      const categoriesData = await CategoryService.getAllCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadNote = async () => {
    try {
      setLoadingNote(true);
      setError(null);
      const note = await NoteService.getNoteById(id);
      setFormData({
        title: note.title,
        content: note.content,
        archived: note.archived,
        category: note.category || ''
      });
    } catch (err) {
      setError('Error al cargar la nota');
      console.error('Error loading note:', err);
    } finally {
      setLoadingNote(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('El título es requerido');
      return;
    }
    
    if (!formData.content.trim()) {
      setError('El contenido es requerido');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isEditing) {
        const updatedNote = await NoteService.updateNote(id, formData);
        onNoteUpdated(updatedNote);
        navigate('/');
      } else {
        const newNote = await NoteService.createNote(formData);
        onNoteCreated(newNote);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar la nota');
      console.error('Error saving note:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loadingNote) {
    return (
      <div className="container">
        <div className="loading">
          <h2>Cargando nota...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            {isEditing ? 'Editar Nota' : 'Nueva Nota'}
          </h2>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Ingresa el título de la nota"
              maxLength="100"
              required
            />
            <small className="text-muted">
              {formData.title.length}/100 caracteres
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Contenido *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="form-control"
              placeholder="Escribe el contenido de la nota"
              rows="8"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Categoría
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Seleccionar categoría (opcional)</option>
              {categories.map(category => (
                <option key={category.idCategories} value={category.idCategories}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {isEditing && (
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  name="archived"
                  checked={formData.archived}
                  onChange={handleChange}
                />
                Archivar nota
              </label>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-success"
            >
              {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
