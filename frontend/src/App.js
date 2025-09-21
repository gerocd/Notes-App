import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import NotesList from './components/NotesList';
import ArchivedNotesList from './components/ArchivedNotesList';
import NoteForm from './components/NoteForm';
import SearchNotes from './components/SearchNotes';
import CategoryManager from './components/CategoryManager';
import { NoteService } from './services/NoteService';

function App() {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const [activeNotes, archivedNotesData] = await Promise.all([
        NoteService.getAllNotes(),
        NoteService.getArchivedNotes()
      ]);
      setNotes(activeNotes);
      setArchivedNotes(archivedNotesData);
    } catch (err) {
      setError('Error al cargar las notas');
      console.error('Error loading notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNoteCreated = (newNote) => {
    setNotes(prevNotes => [newNote, ...prevNotes]);
  };

  const handleNoteUpdated = (updatedNote) => {
    if (updatedNote.archived) {
      setNotes(prevNotes => prevNotes.filter(note => note.idNotes !== updatedNote.idNotes));
      setArchivedNotes(prevNotes => [updatedNote, ...prevNotes]);
    } else {
      setArchivedNotes(prevNotes => prevNotes.filter(note => note.idNotes !== updatedNote.idNotes));
      setNotes(prevNotes => [updatedNote, ...prevNotes]);
    }
  };

  const handleNoteDeleted = (noteId) => {
    setNotes(prevNotes => prevNotes.filter(note => note.idNotes !== noteId));
    setArchivedNotes(prevNotes => prevNotes.filter(note => note.idNotes !== noteId));
  };

  const handleNoteArchived = (noteId) => {
    const note = notes.find(n => n.idNotes === noteId);
    if (note) {
      const archivedNote = { ...note, archived: true };
      setNotes(prevNotes => prevNotes.filter(n => n.idNotes !== noteId));
      setArchivedNotes(prevNotes => [archivedNote, ...prevNotes]);
    }
  };

  const handleNoteUnarchived = (noteId) => {
    const note = archivedNotes.find(n => n.idNotes === noteId);
    if (note) {
      const unarchivedNote = { ...note, archived: false };
      setArchivedNotes(prevNotes => prevNotes.filter(n => n.idNotes !== noteId));
      setNotes(prevNotes => [unarchivedNote, ...prevNotes]);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h2>Cargando notas...</h2>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <header className="card">
          <div className="card-header">
            <h1 className="card-title">📝 Aplicación de Notas</h1>
            <nav style={{ marginTop: '16px' }}>
              <Link to="/" className="btn btn-primary" style={{ marginRight: '8px' }}>
                Notas Activas ({notes.length})
              </Link>
              <Link to="/archived" className="btn btn-secondary" style={{ marginRight: '8px' }}>
                Notas Archivadas ({archivedNotes.length})
              </Link>
              <Link to="/create" className="btn btn-success" style={{ marginRight: '8px' }}>
                Nueva Nota
              </Link>
              <Link to="/search" className="btn btn-warning" style={{ marginRight: '8px' }}>
                Buscar
              </Link>
              <Link to="/categories" className="btn btn-info">
                Categorías
              </Link>
            </nav>
          </div>
        </header>

        <main className="container">
          {error && (
            <div className="alert alert-danger">
              {error}
              <button 
                onClick={loadNotes} 
                className="btn btn-primary btn-sm" 
                style={{ marginLeft: '12px' }}
              >
                Reintentar
              </button>
            </div>
          )}

          <Routes>
            <Route 
              path="/" 
              element={
                <NotesList 
                  notes={notes}
                  onNoteUpdated={handleNoteUpdated}
                  onNoteDeleted={handleNoteDeleted}
                  onNoteArchived={handleNoteArchived}
                />
              } 
            />
            <Route 
              path="/archived" 
              element={
                <ArchivedNotesList 
                  notes={archivedNotes}
                  onNoteUpdated={handleNoteUpdated}
                  onNoteDeleted={handleNoteDeleted}
                  onNoteUnarchived={handleNoteUnarchived}
                />
              } 
            />
            <Route 
              path="/create" 
              element={
                <NoteForm 
                  onNoteCreated={handleNoteCreated}
                />
              } 
            />
            <Route 
              path="/edit/:id" 
              element={
                <NoteForm 
                  onNoteUpdated={handleNoteUpdated}
                />
              } 
            />
            <Route 
              path="/search" 
              element={<SearchNotes />} 
            />
            <Route 
              path="/categories" 
              element={<CategoryManager onCategoryChange={loadNotes} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
