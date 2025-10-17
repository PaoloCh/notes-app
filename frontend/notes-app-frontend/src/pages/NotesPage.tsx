import { useState, useEffect } from 'react';
import apiClient from '../services/api';
import type { Note, Category } from '../types';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';
import EditNoteModal from '../components/EditNoteModal';
import ActionBar from '../components/ActionBar';

type FilterStatus = 'all' | 'active' | 'archived';

interface NotesPageProps {
  onLogout: () => void;
}

function NotesPage({ onLogout }: NotesPageProps) {
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<number | 'all'>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [notesResponse, categoriesResponse] = await Promise.all([
          apiClient.get<Note[]>('/notes'),
          apiClient.get<Category[]>('/categories'),
        ]);
        setAllNotes(notesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        setError('Failed to fetch initial data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let notesToDisplay = allNotes;

    if (statusFilter === 'active') {
      notesToDisplay = notesToDisplay.filter(note => !note.archived);
    } else if (statusFilter === 'archived') {
      notesToDisplay = notesToDisplay.filter(note => note.archived);
    }

    if (categoryFilter !== 'all') {
      notesToDisplay = notesToDisplay.filter(note => note.category?.id === categoryFilter);
    }

    setFilteredNotes(notesToDisplay);
  }, [statusFilter, categoryFilter, allNotes]);

  const createNote = async (title: string, content: string, categoryId?: number) => {
    try {
      const payload = { title, content, categoryId: categoryId || null };
      const response = await apiClient.post<Note>('/notes', payload);
      setAllNotes([response.data, ...allNotes]);
    } catch (err) {
      setError('Failed to create note.');
    }
  };

  const updateNote = async (id: number, title: string, content: string, categoryId?: number) => {
    try {
      const payload = { title, content, categoryId: categoryId || null };
      const response = await apiClient.put<Note>(`/notes/${id}`, payload);
      setAllNotes(allNotes.map((note) => (note.id === id ? response.data : note)));
      handleCloseModal();
    } catch (err) {
      setError('Failed to update note.');
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await apiClient.delete(`/notes/${id}`);
      setAllNotes(allNotes.filter((note) => note.id !== id));
    } catch (err) {
      setError('Failed to delete note.');
    }
  };
  
  const archiveNote = async (id: number) => {
    try {
      const response = await apiClient.patch<Note>(`/notes/${id}/archive`);
      setAllNotes(allNotes.map((note) => (note.id === id ? response.data : note)));
    } catch (err) {
      setError('Failed to archive note.');
    }
  };

  const createCategory = async (name: string) => {
    try {
      const response = await apiClient.post<Category>('/categories', { name });
      setCategories([...categories, response.data]);
    } catch (err) {
      setError('Failed to create category.');
    }
  };

  const handleEditClick = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };
  
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Notes App</h1>
          <button 
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <NoteForm createNote={createNote} categories={categories} />

        <ActionBar
          categories={categories}
          onCreateCategory={createCategory}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
        />

        {loading ? (
          <div className="text-center text-gray-500">Loading notes...</div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onArchive={archiveNote}
                onEdit={handleEditClick}
              />
            ))}
          </ul>
        )}
      </main>

      <EditNoteModal
        isOpen={isModalOpen}
        note={editingNote}
        onClose={handleCloseModal}
        onSave={updateNote}
        categories={categories}
      />
    </div>
  );
}

export default NotesPage;
