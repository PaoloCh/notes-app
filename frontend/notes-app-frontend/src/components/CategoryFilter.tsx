import type { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  currentFilter: number | 'all';
  onFilterChange: (id: number | 'all') => void;
}

const CategoryFilter = ({ categories, currentFilter, onFilterChange }: CategoryFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="category-filter" className="font-semibold text-gray-700">Filter by Category:</label>
      <select
        id="category-filter"
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value === 'all' ? 'all' : Number(e.target.value))}
        className="p-2 border rounded-md"
      >
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;