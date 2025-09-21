import React, { useState, useEffect } from 'react';
import { CategoryService } from '../services/CategoryService';

const CategoryManager = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const categoriesData = await CategoryService.getAllCategories();
      setCategories(categoriesData);
    } catch (err) {
      setError('Error al cargar las categorías');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      setLoading(true);
      setError(null);
      await CategoryService.createCategory(newCategoryName.trim());
      setNewCategoryName('');
      await loadCategories();
      if (onCategoryChange) onCategoryChange();
    } catch (err) {
      setError('Error al crear la categoría');
      console.error('Error creating category:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && categories.length === 0) {
    return <div className="loading">Cargando categorías...</div>;
  }

  return (
    <div className="category-manager">
      <h3>Gestionar Categorías</h3>
      
      {error && (
        <div className="alert alert-danger">
          {error}
          <button 
            onClick={loadCategories} 
            className="btn btn-primary btn-sm" 
            style={{ marginLeft: '12px' }}
          >
            Reintentar
          </button>
        </div>
      )}

      <form onSubmit={handleCreateCategory} className="category-form">
        <div className="form-group">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Nombre de la categoría"
            className="form-control"
            disabled={loading}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading || !newCategoryName.trim()}
        >
          {loading ? 'Creando...' : 'Crear Categoría'}
        </button>
      </form>

      <div className="categories-list">
        <h4>Categorías existentes:</h4>
        {categories.length === 0 ? (
          <p>No hay categorías creadas</p>
        ) : (
          <div className="category-tags">
            {categories.map(category => (
              <span key={category.idCategories} className="category-tag">
                {category.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
