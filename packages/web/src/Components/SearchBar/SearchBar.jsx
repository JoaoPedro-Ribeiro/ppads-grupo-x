/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log('Valor da busca:', searchTerm)
        }
    }

    return (
        <input
            type="text"
            className="search"
            placeholder="BUSCAR"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
        />
    )
}

export default SearchBar
