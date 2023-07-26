// SearchAndFilter.js
import React, { useState } from 'react';

const SearchAndFilter = ({ onSearch, onSortChange, sortOption }) => {
    const [searchText, setSearchText] = useState('');

    const handleSortChange = (option) => {
        onSortChange(option);
    };

    const handleSearch = () => {
        onSearch(searchText);
    };

    return (
        <div>
            <div>
                <h2>Sort tasks:</h2>
                <button
                    onClick={() => handleSortChange('newest')}
                    className={sortOption === 'newest' ? 'active' : ''}
                >
                    Newest
                </button>
                <button
                    onClick={() => handleSortChange('oldest')}
                    className={sortOption === 'oldest' ? 'active' : ''}
                >
                    Oldest
                </button>
                <button
                    onClick={() => handleSortChange('relevance')}
                    className={sortOption === 'relevance' ? 'active' : ''}
                >
                    Most Relevant
                </button>
            </div>
            <div>
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search tasks"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default SearchAndFilter;
