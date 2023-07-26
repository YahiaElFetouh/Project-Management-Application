// SearchAndFilter.js
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const searchAndFilter = ({ onSearch, onSortChange, sortOption }) => {
    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    };

    return (
        <Form>
            <InputGroup className='my-3'>
                {/* onChange for search */}
                <Form.Control
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder='Search Tasks'
                />
            </InputGroup>
            <InputGroup className='my-3'>
                {/* onChange for sort option */}
                <Form.Control as='select' value={sortOption} onChange={handleSortChange}>
                    <option value='newest'>Newest</option>
                    <option value='oldest'>Oldest</option>
                    <option value='mostRelevant'>Most Relevant</option>
                </Form.Control>
            </InputGroup>
        </Form>
    );
};

export default searchAndFilter;
