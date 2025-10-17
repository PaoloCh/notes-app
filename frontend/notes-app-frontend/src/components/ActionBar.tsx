import CategoryManager from './CategoryManager';
import FilterControls from './FilterControls';
import CategoryFilter from './CategoryFilter';
import type { Category } from '../types';

type FilterStatus = 'all' | 'active' | 'archived';

interface ActionBarProps {
  categories: Category[];
  onCreateCategory: (name: string) => Promise<void>;
  statusFilter: FilterStatus;
  onStatusFilterChange: (status: FilterStatus) => void;
  categoryFilter: number | 'all';
  onCategoryFilterChange: (id: number | 'all') => void;
}

const ActionBar = (props: ActionBarProps) => {
  return (
    <div className="my-8 p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      
      <div className="md:w-1/4 flex justify-start">
        <CategoryManager 
          categories={props.categories} 
          onCreateCategory={props.onCreateCategory} 
        />
      </div>

      <div className="flex justify-center">
        <FilterControls 
          currentFilter={props.statusFilter} 
          onFilterChange={props.onStatusFilterChange} 
        />
      </div>

      <div className="md:w-1/4 flex justify-end">
        <CategoryFilter 
          categories={props.categories} 
          currentFilter={props.categoryFilter} 
          onFilterChange={props.onCategoryFilterChange} 
        />
      </div>
    </div>
  );
};

export default ActionBar;
