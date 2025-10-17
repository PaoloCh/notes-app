import { useState } from 'react';
import type { Category } from '../types';

interface CategoryManagerProps {
  categories: Category[];
  onCreateCategory: (name: string) => Promise<void>;
}

const CategoryManager = ({ categories, onCreateCategory }: CategoryManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      await onCreateCategory(newCategoryName.trim());
      setNewCategoryName('');
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Manage Categories
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Categories</h2>
            <ul className="mb-4 h-40 overflow-y-auto border rounded p-2">
              {categories.map(cat => (
                <li key={cat.id} className="py-1">{cat.name}</li>
              ))}
            </ul>
            <form onSubmit={handleSubmit}>
              <label htmlFor="category-name" className="block text-gray-700 font-bold mb-2">
                New Category
              </label>
              <input
                id="category-name"
                type="text"
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-4"
                placeholder="Enter category name"
              />
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                  Close
                </button>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryManager;
