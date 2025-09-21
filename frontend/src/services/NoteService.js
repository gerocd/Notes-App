import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/notes';

class NoteService {
  static async getAllNotes() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  }

  static async getArchivedNotes() {
    try {
      const response = await axios.get(`${API_BASE_URL}/archived`);
      return response.data;
    } catch (error) {
      console.error('Error fetching archived notes:', error);
      throw error;
    }
  }

  static async getNoteById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching note:', error);
      throw error;
    }
  }

  static async createNote(noteData) {
    try {
      const response = await axios.post(API_BASE_URL, noteData);
      return response.data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  }

  static async updateNote(id, noteData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, noteData);
      return response.data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }

  static async deleteNote(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }

  static async archiveNote(id) {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/archive`);
      return response.data;
    } catch (error) {
      console.error('Error archiving note:', error);
      throw error;
    }
  }

  static async unarchiveNote(id) {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/unarchive`);
      return response.data;
    } catch (error) {
      console.error('Error unarchiving note:', error);
      throw error;
    }
  }

  static async searchNotes(searchTerm) {
    try {
      const response = await axios.get(`${API_BASE_URL}/search?q=${encodeURIComponent(searchTerm)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching notes:', error);
      throw error;
    }
  }
}

export { NoteService };
