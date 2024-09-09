import React, { useState } from 'react';
import './Search.css'

function Search() {
    const [addBookOpen, setAddBookOpen] = useState(false);

    const handleAddBook = () => {
      setAddBookOpen(true);
    };
  
    const handleCloseModal = () => {
      setAddBookOpen(false);
    };

    return (
        <input type="text" className="search" placeholder="BUSCAR" />    
    );
}
  
export default Search;
  