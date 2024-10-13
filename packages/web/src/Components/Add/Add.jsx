import { useState } from 'react';
import { Modal, Box, Button, IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './Add.css';

function Add() {
    const [addBookOpen, setAddBookOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleAddBook = () => {
        setAddBookOpen(true);
    };

    const handleCloseModal = () => {
        setAddBookOpen(false);
    };

    const handleImageChange = () => {
        // handle image change logic here
    };

    const handleUploadClick = () => {
        document.getElementById('coverImage').click();
    };
    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };
    
    const handleQuantityInputChange = (event) => {
        const value = parseInt(event.target.value);

        setQuantity(value);

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
                                <ImageIcon sx={{ fontSize: 40, color: 'var(--branco)' }} />
                                <p>ADICIONE</p> 
                                <p>UMA</p> 
                                <p>IMAGEM</p>
                                <input type="file" id="coverImage" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                            </div>
                            <Button paperprops={{ className: 'confirm' }}  onClick={handleCloseModal}>CONFIRMAR</Button>
                        </div>
                        <div className='bodyUser'>
                            <div className="input-container">
                                <EditIcon sx={{ color: 'var(--branco)' }} />
                                <input type="text" autoComplete="off" placeholder="ADICIONE O NOME DO LIVRO" />
                            </div>

                            <div className="input-container">
                                <EditIcon sx={{ color: 'var(--branco)' }} />
                                <input type="text" placeholder="ADICIONE UMA DESCRIÇÃO" />
                            </div>
                        </div>
                        <div className='bottomUser'>
                            <div className="input-bottom">
                                <select defaultValue="OUTROS" aria-label="CATEGORIA">
                                    <option value="ADMINISTRAÇÃO">ADMINISTRAÇÃO</option>
                                    <option value="ARTE">ARTE</option>
                                    <option value="ARTESANATO">ARTESANATO</option>
                                    <option value="OUTROS">OUTROS</option>
                                </select>
                            </div>

                            <div className="input-bottom">
                                <IconButton disableRipple sx={{ color: 'var(--branco)' }} onClick={() => handleQuantityChange(-1)}> <RemoveIcon /> </IconButton>
                                <input type="number" placeholder="QTD" value={quantity} onChange={handleQuantityInputChange} />
                                <IconButton disableRipple sx={{ color: 'var(--branco)' }} onClick={() => handleQuantityChange(1)}> <AddIcon /> </IconButton>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Add;
