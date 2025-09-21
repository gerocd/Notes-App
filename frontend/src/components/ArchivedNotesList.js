import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NoteService } from '../services/NoteService';

const ArchivedNotesList = ({ notes, onNoteUpdated, onNoteDeleted, onNoteUnarchived }) => {
  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);

  const handleUnarchive = async (noteId) => {
    try {
      setLoading(prev => ({ ...prev, [noteId]: true }));
      setError(null);
      await NoteService.unarchiveNote(noteId);
      onNoteUnarchived(noteId);
    } catch (err) {
      setError('Error al desarchivar la nota');
      console.error('Error unarchiving note:', err);
    } finally {
      setLoading(prev => ({ ...prev, [noteId]: false }));
    }
  };

  const handleDelete = async (noteId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota archivada?')) {
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

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <h3>No hay notas archivadas</h3>
        <p>Las notas archivadas aparecerán aquí.</p>
        <Link to="/" className="btn btn-primary">
          Ver Notas Activas
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
      
      <div className="grid grid-2">
        {notes.map(note => (
          <div key={note.idNotes} className="card" style={{ opacity: 0.8 }}>
            <div className="card-header">
              <h3 className="card-title">
                📁 {note.title}
                <span style={{ 
                  fontSize: '12px', 
                  fontWeight: 'normal', 
                  color: '#6c757d',
                  marginLeft: '8px'
                }}>
                  (Archivada)
                </span>
              </h3>
              <p className="text-muted">
                Creada: {formatDate(note.createdAt)}
                {note.updatedAt !== note.createdAt && (
                  <span> • Actualizada: {formatDate(note.updatedAt)}</span>
                )}
              </p>
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
              <button
                onClick={() => handleUnarchive(note.idNotes)}
                disabled={loading[note.idNotes]}
                className="btn btn-success btn-sm"
              >
                {loading[note.idNotes] ? 'Desarchivando...' : 'Desarchivar'}
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

export default ArchivedNotesList;
