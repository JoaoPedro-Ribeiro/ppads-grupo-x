import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, MenuItem, IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import api from '../../services/axios';
import { apiBaseUrl } from '../../../externalUrls';
import './Add.css';

function Add() {
    const [addBookOpen, setAddBookOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [bookName, setBookName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(1);
    const [bookCategory, setBookCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get(`${apiBaseUrl}/books/categories`);
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    const sortedCategories = response.data.data.map(cat => cat.category).sort();
                    setCategories(sortedCategories);
                } else {
                    console.error('Formato de resposta inválido:', response.data);
                    setCategories([]);
                }
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
                setCategories([]);
            }
        };

        fetchCategories();
    }, []);

    const handleAddBook = () => {
        setAddBookOpen(true);
    };

    const handleCloseModal = () => {
        setAddBookOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setFile(null);
        setFilePreview(null);
        setBookName('');
        setDescription('');
        setAmount(1);
        setBookCategory('');
    };

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUploadClick = () => {
        document.getElementById('coverImage').click();
    };

    const handleAmountChange = (change) => {
        setAmount(prev => Math.max(1, prev + change));
    };
    
    const handleAmountInputChange = (event) => {
        const value = parseInt(event.target.value);
        setAmount(isNaN(value) ? 1 : Math.max(1, value));
    };

    const handleCategoryChange = (event) => {
        setBookCategory(event.target.value);
    };

    const isFormValid = () => {
        return file && bookName.trim() !== '' && description.trim() !== '' && bookCategory !== '';
    };

    const handleConfirm = () => {
        if (isFormValid()) {
            const bookData = {
                file: file,
                book_name: bookName,
                description: description,
                book_category: bookCategory,
                amount: amount
            };
            console.log('Dados do livro:', bookData);
            handleCloseModal();
        }
    };
    
    return (
        <div>
            <Button className="add" onClick={handleAddBook}>
                + ADICIONAR
            </Button>

            <Modal open={addBookOpen} onClose={handleCloseModal}>
                <Box className="modal-Add">
                    <div className="box-Add">
                        <div className='headerUser'>
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
                            <Button 
                                paperprops={{ className: 'confirm' }} 
                                onClick={handleConfirm}
                                disabled={!isFormValid()}
                            >
                                CONFIRMAR
                            </Button>
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
                                    value={bookCategory} 
                                    onChange={handleCategoryChange}
                                >
                                    <option value="" disabled>CATEGORIA</option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat}>
                                            {cat.toUpperCase()}
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
        </div>
    );
}

export default Add;
