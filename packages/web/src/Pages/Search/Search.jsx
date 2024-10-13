import './Search.css';
import { useState, useEffect } from 'react';
import Menu from '../../Components/Menu/Menu.jsx';
import UserMenu from '../../Components/UserMenu/UserMenu.jsx';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx';
import Add from '../../Components/Add/Add.jsx';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function Search() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchBooks = async () => {
        try {
            const response = await fetch('search/books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleBookClick = (book) => {
        setSelectedBook(book);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedBook(null);
    };

    const handleUploadClick = () => {
        document.getElementById('coverImage').click();
    };

    const handleQuantityChange = (amount) => {
        setSelectedBook((prevBook) => ({
            ...prevBook,
            quantity: prevBook.quantity + amount,
        }));
    };

    const handleQuantityInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setSelectedBook((prevBook) => ({
            ...prevBook,
            quantity: isNaN(value) ? 0 : value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Handle the image file here
            console.log("Selected file:", file);
        }
    };

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
    );
}

export default Search;
