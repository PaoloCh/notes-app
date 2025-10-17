import { useState } from 'react';
import type { Category } from '../types';

interface NoteFormProps {
  createNote: (title: string, content: string, categoryId?: number) => Promise<void>;
  categories: Category[];
}

function NoteForm({ createNote, categories }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !content) return;
    await createNote(title, content, selectedCategory);
    setTitle('');
    setContent('');
    setSelectedCategory(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create a New Note</h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category (Optional)</label>
        <select
          id="category"
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

      <div className="flex items-center justify-end">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Note
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
