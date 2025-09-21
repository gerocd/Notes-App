import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NoteService } from '../services/NoteService';

const SearchNotes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError('Ingresa un término de búsqueda');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      
      const results = await NoteService.searchNotes(searchTerm);
      setSearchResults(results);
    } catch (err) {
      setError('Error al buscar notas');
      console.error('Error searching notes:', err);
    } finally {
      setLoading(false);
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

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} style={{ backgroundColor: '#ffeb3b', padding: '2px 4px' }}>
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">🔍 Buscar Notas</h2>
        </div>

        <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
          <div className="form-group">
            <label htmlFor="searchTerm" className="form-label">
              Término de búsqueda
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                placeholder="Buscar en títulos y contenido..."
                style={{ flex: 1 }}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            <h3>Buscando notas...</h3>
          </div>
        )}

        {hasSearched && !loading && (
          <div>
            <h3>
              Resultados para "{searchTerm}" ({searchResults.length})
            </h3>
            
            {searchResults.length === 0 ? (
              <div className="empty-state">
                <h4>No se encontraron notas</h4>
                <p>Intenta con otros términos de búsqueda.</p>
              </div>
            ) : (
              <div className="grid grid-2">
                {searchResults.map(note => (
                  <div key={note.idNotes} className="card">
                    <div className="card-header">
                      <h4 className="card-title">
                        {highlightText(note.title, searchTerm)}
                      </h4>
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
                        {highlightText(note.content, searchTerm)}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <Link 
                        to={`/edit/${note.idNotes}`} 
                        className="btn btn-primary btn-sm"
                      >
                        Editar
                      </Link>
                      
                      <Link 
                        to="/" 
                        className="btn btn-secondary btn-sm"
                      >
                        Ver Todas
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!hasSearched && !loading && (
          <div className="empty-state">
            <h3>Buscar en tus notas</h3>
            <p>Ingresa un término de búsqueda para encontrar notas por título o contenido.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchNotes;
