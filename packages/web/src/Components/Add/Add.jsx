import { useState, useEffect } from 'react'
import { Modal, Box, Button, IconButton, Snackbar, Alert } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import api from '../../services/axios'
import { apiBaseUrl } from '../../../externalUrls'
import './Add.css'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function Add({ fetchBooks }) {
    const [addBookOpen, setAddBookOpen] = useState(false)
    const [file, setFile] = useState(null)
    const [filePreview, setFilePreview] = useState(null)
    const [bookName, setBookName] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState(1)
    const [bookCategoryId, setBookCategoryId] = useState('')
    const [categories, setCategories] = useState([])
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
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
                    console.error('Formato de resposta inválido:', response.data)
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

        fetchCategories()
    }, [])

    const handleAddBook = () => {
        setAddBookOpen(true)
    }

    const handleCloseModal = () => {
        setAddBookOpen(false)
        resetForm()
    }

    const resetForm = () => {
        setFile(null)
        setFilePreview(null)
        setBookName('')
        setDescription('')
        setAmount(1)
        setBookCategoryId('')
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

    const handleUploadClick = () => {
        document.getElementById('coverImage').click()
    }

    const handleAmountChange = (change) => {
        setAmount(prev => Math.max(1, prev + change))
    }

    const handleAmountInputChange = (event) => {
        const value = parseInt(event.target.value)
        setAmount(isNaN(value) ? 1 : Math.max(1, value))
    }

    const handleCategoryChange = (event) => {
        setBookCategoryId(event.target.value)
    }

    const isFormValid = () => {
        return file && bookName.trim() !== '' && description.trim() !== '' && bookCategoryId !== ''
    }

    const handleSnackbarOpen = (message, severity) => {
        setSnackbarMessage(message)
        setSnackbarSeverity(severity)
        setSnackbarOpen(true)
    }

    const handleConfirm = async () => {
        if (isFormValid()) {
            setIsLoading(true)
            const formData = new FormData()
            formData.append('name', bookName)
            formData.append('description', description)
            formData.append('category', bookCategoryId)
            formData.append('amount', amount)
            if (file) {
                formData.append('cover', file)
            }

            try {
                const response = await api.post(`${apiBaseUrl}/books/createBook`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                if (response.data.success) {
                    handleSnackbarOpen('Livro criado com sucesso!', 'success')
                    handleCloseModal()
                    if (window.location.pathname === '/search') {
                        fetchBooks()
                    }
                } else {
                    handleSnackbarOpen(`Erro ao criar livro: ${response.data.message}`, 'error')
                }
            } catch (error) {
                console.error("Erro ao criar livro:", error.response ? error.response.data : error.message)
                handleSnackbarOpen(`Erro ao criar livro: ${error.response?.data?.message || 'Something went wrong'}`, 'error')
                if (error.response.status === 401) {
                    localStorage.removeItem('token')
                    navigate('/login')
                }
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <div>
            <Button className="add" onClick={handleAddBook}>
                <span className="add-symbol">+</span>
                <span className="add-text">ADICIONAR</span>
            </Button>

            <Modal open={addBookOpen} onClose={handleCloseModal}>
                <Box className="modal-Add">
                    <div className="box-Add">
                        <div className='headerUserAdd'>
                            <div className='headerUserAddButton'>
                                <Button paperprops={{ className: 'confirm' }} onClick={handleConfirm} disabled={!isFormValid() || isLoading}>
                                    {isLoading ? 'CARREGANDO...' : 'CONFIRMAR'}
                                </Button>
                            </div>
                            <div className="upload-containerBox">
                                <div className="upload-container" onClick={handleUploadClick}>
                                    {filePreview ? (
                                        <img src={filePreview} alt="Capa do livro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <>
                                            <ImageIcon sx={{ fontSize: 40, color: 'var(--branco)' }} />
                                            <p>ADICIONE</p>
                                            <p>UMA</p>
                                            <p>IMAGEM</p>
                                        </>
                                    )}
                                    <input type="file" id="coverImage" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                </div>
                            </div>
                        </div>
                        <div className='bodyUser'>
                            <div className="input-container">
                                <EditIcon sx={{ color: 'var(--branco)' }} />
                                <input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="ADICIONE O NOME DO LIVRO"
                                    value={bookName}
                                    onChange={(e) => setBookName(e.target.value)}
                                />
                            </div>

                            <div className="input-container">
                                <EditIcon sx={{ color: 'var(--branco)' }} />
                                <input
                                    type="text"
                                    placeholder="ADICIONE UMA DESCRIÇÃO"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='bottomUser'>
                            <div className="input-bottom">
                                <select
                                    value={bookCategoryId}
                                    onChange={handleCategoryChange}
                                >
                                    <option value="" disabled>CATEGORIA</option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat.id}>
                                            {cat.name.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-bottom">
                                <IconButton disableRipple sx={{ color: 'var(--branco)' }} onClick={() => handleAmountChange(-1)}> <RemoveIcon /> </IconButton>
                                <input type="number" placeholder="QTD" value={amount} onChange={handleAmountInputChange} />
                                <IconButton disableRipple sx={{ color: 'var(--branco)' }} onClick={() => handleAmountChange(1)}> <AddIcon /> </IconButton>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

Add.propTypes = {
    fetchBooks: PropTypes.func.isRequired,
}

export default Add
