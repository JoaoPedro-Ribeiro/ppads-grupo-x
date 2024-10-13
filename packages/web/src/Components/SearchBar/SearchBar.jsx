import { useState } from 'react';
import './SearchBar.css'

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <input 
            type="text" 
            className="search" 
            placeholder="BUSCAR" 
            value={searchTerm} 
            onChange={handleChange} 
        />    
    );
}
  
export default SearchBar;