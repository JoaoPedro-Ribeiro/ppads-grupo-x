import React, { useState } from 'react';
import { IconButton, Modal, Box, Button, Drawer } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import './UserMenu.css'

function UserMenu() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [manageUsersOpen, setManageUsersOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
  
        console.log(username, email)
  
        console.log("Envio");
    }

    const handleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const handleManageUsers = () => {
        setManageUsersOpen(true);
    };

    const handleCloseModal = () => {
        setManageUsersOpen(false);
    };

    return (
        <div className="userMenu">
            <div className='iconUser'>
                <IconButton onClick={handleUserMenu}>
                    <PersonIcon sx={{ fontSize: 40, color: 'var(--branco)' }} />
                </IconButton>
            </div>

            <Drawer open={userMenuOpen} PaperProps={{ className: 'user-menu' }} onClose={handleUserMenu} anchor="right" >
                    <div className='firstUser'>
                        <h2 >OLÁ, USUÁRIO!</h2>
                        <IconButton onClick={handleUserMenu}>
                            <PersonIcon sx={{ fontSize: 40, color: 'var(--branco)', marginRight: 0, marginTop: -2.5 }} />
                        </IconButton>
                    </div>
                    <div className='secondUser'>
                        <Button disableRipple onClick={handleManageUsers}>GERENCIAR USUÁRIOS</Button>
                        <Button disableRipple onClick={() => alert('Sair')}>SAIR</Button>
                    </div>
            </ Drawer>

            <Modal open={manageUsersOpen} onClose={handleCloseModal}>
                <Box className="modal-box">
                    <div className="modalUser">
                        <h2>ADICIONE UM NOVO USUÁRIO</h2>
                        <div className='formUser'>
                            <div className='containerUser'>
                                <form onSubmit={handleSubmit}>
                                    <div className='input-field'>
                                        <input type='name' placeholder='NOME' onChange={(e) => setUsername(e.target.value)}></input>
                                    </div>
                                    <div className='input-field'>
                                        <input type='email' placeholder='EMAIL' onChange={(e) => setEmail(e.target.value)}></input>
                                    </div>

                                    <div className="bln-admin">
                                        <label>
                                            <input type="checkbox" />
                                            ADMINISTRADOR
                                        </label>
                                    </div>

                                    <button>CONFIRMAR</button>
                                </form>
                            </div>  
                        </div>
                        <h2>USUÁRIOS</h2>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
  
export default UserMenu;
  