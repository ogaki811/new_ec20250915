import { useState, useMemo } from 'react';

function useSearch(items, searchKeys = ['name', 'code']) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }

    const query = searchQuery.toLowerCase();

    return items.filter((item) => {
      return searchKeys.some((key) => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query);
        }
        return false;
      });
    });
  }, [items, searchQuery, searchKeys]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    hasResults: filteredItems.length > 0,
    resultCount: filteredItems.length,
  };
}

export default useSearch;
