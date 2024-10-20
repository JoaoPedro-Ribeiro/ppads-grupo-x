/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */

import './Search.css'
import React, { useState, useEffect } from 'react'
import Menu from '../../Components/Menu/Menu.jsx'
import UserMenu from '../../Components/UserMenu/UserMenu.jsx'
import SearchBar from '../../Components/SearchBar/SearchBar.jsx'
import Add from '../../Components/Add/Add.jsx'

function Search() {
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const fetchBooks = async () => {
        try {
            const response = await fetch('search/books')
            const data = await response.json()
            setBooks(data)
        } catch (error) {
            console.error("Erro ao buscar livros:", error)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    const handleBookClick = (book) => {
        setSelectedBook(book)
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setSelectedBook(null)
    }

    return (
    <div className="Search">
        <div className="SearchHeader">
            <Menu />
            <div className="SearchBar">
                <SearchBar />
                <Add />
            </div>
            <UserMenu />
        </div>
        <div className="SearchBody">
            <div className="book-grid">
                {books.map((book) => (
                    <div key={book.id} className="book-card" onClick={() => handleBookClick(book)}>
                        <img src={book.coverImage} alt={book.name} className="book-cover" />
                        <h3>{book.name}</h3>
                    </div>
                ))}
            </div>
        </div>
        {selectedBook && (
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box className="modal-Add">
                    <div className="box-Add">
                        <div className='headerUser'>
                            <div className="upload-container" onClick={handleUploadClick}>
                                <ImageIcon sx={{ fontSize: 40, color: 'var(--branco)' }} />
                                <p>ADICIONE</p>
                                <p>UMA</p>
                                <p>IMAGEM</p>
                                <input type="file" id="coverImage" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                            </div>
                            <Button PaperProps={{ className: 'confirm' }}  onClick={handleCloseModal}>CONFIRMAR</Button>
                        </div>
                        <div className='bodyUser'>
                            <div className="input-container">
                                <EditIcon sx={{ color: 'var(--branco)' }} />
                                <input type="text" value={selectedBook.name} autoComplete="off" placeholder="ADICIONE O NOME DO LIVRO" />
                            </div>

                            <div className="input-container">
                                <EditIcon sx={{ color: 'var(--branco)' }} />
                                <input type="text" value={selectedBook.description} placeholder="ADICIONE UMA DESCRIÇÃO" />
                            </div>
                        </div>
                        <div className='bottomUser'>
                            <div className="input-bottom">
                                <select name="select" label="CATEGORIA">
                                    <option value="ADMINISTRAÇÃO">ADMINISTRAÇÃO</option>
                                    <option value="ARTE" selected>ARTE</option>
                                    <option value="ARTESANATO">ARTESANATO</option>
                                </select>
                            </div>

                            <div className="input-bottom">
                                <IconButton disableRipple sx={{ color: 'var(--branco)' }} onClick={() => handleQuantityChange(-1)}> <RemoveIcon /> </IconButton>
                                <input type="number" placeholder="QTD" value={selectedBook.quantity} onChange={handleQuantityInputChange} />
                                <IconButton disableRipple sx={{ color: 'var(--branco)' }} onClick={() => handleQuantityChange(1)}> <AddIcon /> </IconButton>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        )}
    </div>
    )
}

export default Search
