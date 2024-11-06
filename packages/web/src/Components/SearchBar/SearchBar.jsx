import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            if (searchTerm.trim() === '') {
                navigate(`/search?allbooks`)
            } else {
                navigate(`/search?title=${encodeURIComponent(searchTerm)}`)
            }
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
