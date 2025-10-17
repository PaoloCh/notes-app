import { useState, useEffect } from 'react';
import type { Note, Category } from '../types';

interface EditNoteModalProps {
  note: Note | null;
  isOpen: boolean;
  categories: Category[];
  onClose: () => void;
  onSave: (id: number, title: string, content: string, categoryId?: number) => void;
}

function EditNoteModal({ note, isOpen, categories, onClose, onSave }: EditNoteModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setSelectedCategory(note.category?.id);
    }
  }, [note]);

  if (!isOpen || !note) {
    return null;
  }

  const handleSave = () => {
    onSave(note.id, title, content, selectedCategory);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>
        <div className="mb-4">
          <label htmlFor="edit-title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="edit-content" className="block text-gray-700 font-bold mb-2">
            Content
          </label>
          <textarea
            id="edit-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-24"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="edit-category" className="block text-gray-700 font-bold mb-2">Category</label>
          <select
            id="edit-category"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : undefined)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">No Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditNoteModal;
