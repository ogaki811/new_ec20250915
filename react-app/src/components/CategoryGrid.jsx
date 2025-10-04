import CategoryCard from './CategoryCard';

/**
 * CategoryGrid - カテゴリーグリッドコンポーネント
 */
function CategoryGrid({ categories = [], columns = 4, className = '' }) {
  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  };

  return (
    <div className={`ec-category-grid grid ${gridClasses[columns] || gridClasses[4]} gap-6 ${className}`}>
      {categories.map((category, index) => (
        <CategoryCard
          key={category.id || index}
          category={category.name || category.category}
          image={category.image}
          productCount={category.productCount}
        />
      ))}
    </div>
  );
}

export default CategoryGrid;
