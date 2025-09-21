import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NoteService } from '../services/NoteService';
import { CategoryService } from '../services/CategoryService';

const NotesList = ({ notes, onNoteUpdated, onNoteDeleted, onNoteArchived }) => {
  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredNotes(notes.filter(note => note.category === selectedCategory));
    } else {
      setFilteredNotes(notes);
    }
  }, [notes, selectedCategory]);

  const loadCategories = async () => {
    try {
      const categoriesData = await CategoryService.getAllCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const handleArchive = async (noteId) => {
    try {
      setLoading(prev => ({ ...prev, [noteId]: true }));
      setError(null);
      await NoteService.archiveNote(noteId);
      onNoteArchived(noteId);
    } catch (err) {
      setError('Error al archivar la nota');
      console.error('Error archiving note:', err);
    } finally {
      setLoading(prev => ({ ...prev, [noteId]: false }));
    }
  };

  const handleDelete = async (noteId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      try {
        setLoading(prev => ({ ...prev, [noteId]: true }));
        setError(null);
        await NoteService.deleteNote(noteId);
        onNoteDeleted(noteId);
      } catch (err) {
        setError('Error al eliminar la nota');
        console.error('Error deleting note:', err);
      } finally {
        setLoading(prev => ({ ...prev, [noteId]: false }));
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.idCategories == categoryId);
    return category ? category.name : 'Sin categoría';
  };

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <h3>No hay notas activas</h3>
        <p>¡Crea tu primera nota para comenzar!</p>
        <Link to="/create" className="btn btn-success">
          Crear Nota
        </Link>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="filter-section" style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label htmlFor="categoryFilter" className="form-label">
            Filtrar por categoría:
          </label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-control"
            style={{ maxWidth: '300px' }}
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category.idCategories} value={category.idCategories}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-2">
        {filteredNotes.map(note => (
          <div key={note.idNotes} className="card">
            <div className="card-header">
              <h3 className="card-title">{note.title}</h3>
              <p className="text-muted">
                Creada: {formatDate(note.createdAt)}
                {note.updatedAt !== note.createdAt && (
                  <span> • Actualizada: {formatDate(note.updatedAt)}</span>
                )}
              </p>
              {note.category && (
                <div style={{ marginTop: '8px' }}>
                  <span className="category-tag" style={{
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {getCategoryName(note.category)}
                  </span>
                </div>
              )}
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <p style={{ 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word',
                maxHeight: '150px',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {note.content}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link 
                to={`/edit/${note.idNotes}`} 
                className="btn btn-primary btn-sm"
              >
                Editar
              </Link>
              
              <button
                onClick={() => handleArchive(note.idNotes)}
                disabled={loading[note.idNotes]}
                className="btn btn-warning btn-sm"
              >
                {loading[note.idNotes] ? 'Archivando...' : 'Archivar'}
              </button>
              
              <button
                onClick={() => handleDelete(note.idNotes)}
                disabled={loading[note.idNotes]}
                className="btn btn-danger btn-sm"
              >
                {loading[note.idNotes] ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
