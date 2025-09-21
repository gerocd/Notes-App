import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/categories';

class CategoryService {
  static async getAllCategories() {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  static async createCategory(name) {
    try {
      const response = await axios.post(`${API_BASE_URL}/add-category`, { name });
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  static async addCategoryToNote(noteId, categoryId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/add-category-tonote`, {
        note_id: noteId,
        category_id: categoryId
      });
      return response.data;
    } catch (error) {
      console.error('Error adding category to note:', error);
      throw error;
    }
  }

  static async removeCategoryFromNote(noteId, categoryId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/remove-category-fromnote`, {
        data: {
          note_id: noteId,
          category_id: categoryId
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error removing category from note:', error);
      throw error;
    }
  }

  static async getNotesByCategory(categoryId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/notes-by-category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notes by category:', error);
      throw error;
    }
  }
}

export { CategoryService };
