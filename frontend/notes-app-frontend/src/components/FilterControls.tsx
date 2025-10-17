type FilterStatus = 'all' | 'active' | 'archived';

interface FilterControlsProps {
  currentFilter: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
}

const FilterControls = ({ currentFilter, onFilterChange }: FilterControlsProps) => {
  const getButtonClasses = (filter: FilterStatus) => {
    return currentFilter === filter
      ? 'bg-blue-600 text-white'
      : 'bg-white text-gray-700 hover:bg-gray-200';
  };

  return (
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-md font-semibold transition-colors ${getButtonClasses('all')}`}
      >
        All Notes
      </button>
      <button
        onClick={() => onFilterChange('active')}
        className={`px-4 py-2 rounded-md font-semibold transition-colors ${getButtonClasses('active')}`}
      >
        Active
      </button>
      <button
        onClick={() => onFilterChange('archived')}
        className={`px-4 py-2 rounded-md font-semibold transition-colors ${getButtonClasses('archived')}`}
      >
        Archived
      </button>
    </div>
  );
};

export default FilterControls;