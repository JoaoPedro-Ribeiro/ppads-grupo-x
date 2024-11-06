import './Search.css'
import { useState, useEffect } from 'react'
import Menu from '../../Components/Menu/Menu.jsx'
import UserMenu from '../../Components/UserMenu/UserMenu.jsx'
import SearchBar from '../../Components/SearchBar/SearchBar.jsx'
import Add from '../../Components/Add/Add.jsx'
import HomeButton from '../../Components/HomeButton/HomeButton.jsx'
import { useLocation } from 'react-router-dom'
import api from '../../services/axios'
import { apiBaseUrl } from '../../../externalUrls'
import { Modal, Box, Button, IconButton, Snackbar, Alert } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useNavigate } from 'react-router-dom'

function Search() {
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [file, setFile] = useState(null)
    const [filePreview, setFilePreview] = useState(null)
    const [bookName, setBookName] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [bookCategoryId, setBookCategoryId] = useState('')
    const [categories, setCategories] = useState([])
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {

        fetchBooks()

        const fetchCategories = async () => {
            try {
                const response = await api.get(`${apiBaseUrl}/books/categories`)
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    const sortedCategories = response.data.data.map(cat => ({
                        id: cat.category_id,
                        name: cat.category
                    })).sort((a, b) => a.name.localeCompare(b.name))
                    setCategories(sortedCategories)
                } else {
                    setCategories([])
                }
            } catch (error) {
                console.error('Erro ao buscar categorias:', error)
                setCategories([])
                if (error.response.status === 401) {
                    localStorage.removeItem('token')
                    navigate('/login')
                }
            }
        }

        fetchBooks()
        fetchCategories()
    }, [location.search])

    const fetchBooks = async () => {
        const queryParams = new URLSearchParams(location.search)
        const title = queryParams.get('title')
        const category = queryParams.get('category')
        const allbooks = queryParams.get('allbooks')

        try {
            let response
            if (title) {
                response = await api.get(`${apiBaseUrl}/books/searchBookByTitle`, {
                    params: { title: title }
                })
            } else if (category) {
                response = await api.get(`${apiBaseUrl}/books/getBooksByCategory`, {
                    params: { category: category }
                })
            } else if (allbooks !== null) {
                response = await api.get(`${apiBaseUrl}/books/getAllBooks`)
            }

            if (response) {
                setBooks(response.data.data)
            }
        } catch (error) {
            console.error("Erro ao buscar livros:", error.response ? error.response.data : error.message)
            if (error.response.status === 401) {
                localStorage.removeItem('token')
                navigate('/login')
            }
        }
    }

    const handleBookClick = (book) => {
        setSelectedBook(book)
        setModalOpen(true)
        setBookName(book.name)
        setDescription(book.description)
        setQuantity(book.amount)
        setBookCategoryId(book.category)
        setFile(book.coverUrl)
    }

    const resetForm = () => {
        setSelectedBook(null)
        setFile(null)
        setFilePreview(null)
        setBookName('')
        setDescription('')
        setQuantity(1)
        setBookCategoryId('')
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        resetForm()
        fetchBooks()
    }

    const handleUploadClick = () => {
        document.getElementById('coverImage').click()
    }

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            const reader = new FileReader()
            reader.onloadend = () => {
                setFilePreview(reader.result)
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    const handleQuantityInputChange = (event) => {
        const value = event.target.value
        if (value >= 0) {
            setQuantity(value)
        }
    }

    const handleCategoryChange = (event) => {
        setBookCategoryId(event.target.value)
    }

    const handleConfirm = async () => {
        const updatedBookData = { id: selectedBook.id }

        if (bookName !== selectedBook.name) {
            updatedBookData.name = bookName
        }
        if (description !== selectedBook.description) {
            updatedBookData.description = description
        }
        if (quantity !== selectedBook.amount) {
            updatedBookData.amount = quantity
        }
        if (bookCategoryId !== selectedBook.category) {
            updatedBookData.category = bookCategoryId
        }
        if (file) {

            updatedBookData.cover = file
        }

        try {
            const response = await api.put(`${apiBaseUrl}/books/updateBook`, updatedBookData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.data.success) {
                handleSnackbarOpen('Livro atualizado com sucesso!', 'success')
                handleCloseModal()

            } else {
                handleSnackbarOpen(`Erro ao atualizar livro: ${response.data.message}`, 'error')
            }
        } catch (error) {
            console.error("Erro ao atualizar livro:", error.response ? error.response.data : error.message)
            handleSnackbarOpen(`Erro ao atualizar livro: ${error.response?.data?.message || 'Something went wrong'}`, 'error')
            if (error.response.status === 401) {
                localStorage.removeItem('token')
                navigate('/login')
            }
        }
    }

    const handleExclude = async () => {
        if (window.confirm('Tem certeza que deseja excluir este livro?')) {
            try {
                const response = await api.delete(`${apiBaseUrl}/books/deleteBook`, {
                    params: { id: selectedBook.id }
                })

                if (response.status === 401) {
                    localStorage.removeItem('token')
                    navigate('/login')
                    return
                }

                if (response.data.success) {
                    handleSnackbarOpen('Livro excluído com sucesso!', 'success')
                    handleCloseModal()
                } else {
                    handleSnackbarOpen(`Erro ao excluir livro: ${response.data.message}`, 'error')
                }

            } catch (error) {
                console.error("Erro ao excluir livro:", error.response ? error.response.data : error.message)
                handleSnackbarOpen(`Erro ao excluir livro: ${error.response?.data?.message || 'Something went wrong'}`, 'error')
                if (error.response.status === 401) {
                    localStorage.removeItem('token')
                    navigate('/login')
                }
            }
        }
    }

    const handleSnackbarOpen = (message, severity) => {
        setSnackbarMessage(message)
        setSnackbarSeverity(severity)
        setSnackbarOpen(true)
    }

    const hasChanges = () => {
        return (
            bookName !== selectedBook.name ||
            description !== selectedBook.description ||
            quantity !== selectedBook.amount ||
            bookCategoryId !== selectedBook.category ||
            (file && file !== selectedBook.coverUrl)
        )
    }

    return (
        <div className="Search">
            <div className="SearchHeader">
                <Menu />
                <div className="SearchBar">
                    <HomeButton />
                    <SearchBar />
                    <Add fetchBooks={fetchBooks} />
                </div>
                <UserMenu />
            </div>
            <div className="SearchBody">
                <div className="book-grid">
                    {books.sort((a, b) => a.name.localeCompare(b.name)).map((book) => (
                        <div key={book.id} className="book-card" onClick={() => handleBookClick(book)}>
                            <div className="upload-containerBook">
                                <img src={book.coverUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                            </div>
                            <p title={book.name}>{book.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            {selectedBook && (
                <Modal open={modalOpen} onClose={handleCloseModal}>
                    <Box className="modal-Add">
                        <div className="box-Add">
                            <div className='headerUser'>
                                <Button onClick={handleExclude}>
                                    EXCLUIR
                                </Button>
                                <div className="upload-containerUpd" onClick={handleUploadClick}>
                                    {filePreview ? (
                                        <img src={filePreview} alt="Capa do livro" className="capa-livro" />
                                    ) : (
                                        <img src={selectedBook.coverUrl} alt="Capa do livro" className="capa-livro" />
                                    )}
                                    <input type="file" id="coverImage" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                </div>
                                <Button onClick={handleConfirm} disabled={!hasChanges()}>
                                    ATUALIZAR
                                </Button>
                            </div>
                            <div className='bodyUser'>
                                <div className="input-container">
                                    <EditIcon sx={{ color: 'var(--branco)' }} />
                                    <input type="text" value={bookName} autoComplete="off" placeholder="ADICIONE O NOME DO LIVRO" onChange={(e) => setBookName(e.target.value)}/>
                                </div>

                                <div className="input-container">
                                    <EditIcon sx={{ color: 'var(--branco)' }} />
                                    <input type="text" value={description} placeholder="ADICIONE UMA DESCRIÇÃO" onChange={(e) => setDescription(e.target.value)}/>
                                </div>
                            </div>
                            <div className='bottomUser'>
                                <div className="input-bottom">
                                    <select value={bookCategoryId} onChange={handleCategoryChange}>
                                        <option value="" disabled>CATEGORIA</option>
                                        {categories.map((cat,index) => (
                                            <option key={index} value={cat.id}>
                                                {cat.name.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-bottom">
                                    <IconButton disableRipple sx={{ color: 'var(--branco)' }} onClick={() => setQuantity(quantity - 1)}> <RemoveIcon /> </IconButton>
                                    <input type="number" placeholder="QTD" value={quantity} onChange={handleQuantityInputChange}/>
                                    <IconButton disableRipple sx={{ color: 'var(--branco)' }} onClick={() => setQuantity(quantity + 1)}> <AddIcon /> </IconButton>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            )}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Search
