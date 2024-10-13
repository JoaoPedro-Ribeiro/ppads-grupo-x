import { useState, useEffect } from 'react';
import { IconButton, Modal, Box, Button, Drawer } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import api from '../../services/axios';
import { jwtDecode } from 'jwt-decode';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../../externalUrls';
import './UserMenu.css';

function UserMenu() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [manageUsersOpen, setManageUsersOpen] = useState(false);
    const [managePasswordOpen, setManagePasswordOpen] = useState(false);
    const [username, setUsername] = useState("USUÁRIO")
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isAdmin, setisAdmin] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            const tokenPayload = jwtDecode(jwtToken);
            setUsername(tokenPayload.name);
            setIsUserAdmin(tokenPayload.isAdmin);
        }
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get(`${apiBaseUrl}/users/getAllUsers`, {});
                setUsers(response.data.data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };
        if (isUserAdmin) {
            fetchUsers();
        }
    }, [isUserAdmin]);

    const handleSubmitCreateUser = async (event) => {
        event.preventDefault();

        try {
            const url = `${apiBaseUrl}/users/createUser`;

            const userData = {
                name: name,
                email: email,
                password: password,
                isAdmin: isAdmin
            };

            const response = await api.post(url, userData);

            console.log("Usuário criado:", response.data);
            setEmail("");
            setName("");
            setPassword("");
            setisAdmin(false);
            setManageUsersOpen(false);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    };

    const handleSubmitUpdatePassword = async (event) => {
        event.preventDefault();

        try {
            const url = `${apiBaseUrl}/auth/updatePassword`;
            const passwordData = {
                email: email,
                newPassword: newPassword
            };

            const response = await api.put(url, passwordData);

            console.log("Senha redefinida:", response.data);
            setManagePasswordOpen(false);
        } catch (error) {
            console.error("Erro ao redefinir senha:", error);
        }
    };

    const handleDeleteUser = async (emailToDelete) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                const url = `${apiBaseUrl}/users/deleteUser`;

                const response = await api.post(url, { email: emailToDelete });

                setUsers(users.filter(user => user.email !== emailToDelete));
                console.log("Usuário excluído:", response.data);
            } catch (error) {
                console.error("Erro ao excluir usuário:", error);
            }
        }
    };

    const handleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const handleManageUsers = () => {
        setManageUsersOpen(true);
    };

    const handleCloseModal = () => {
        setManageUsersOpen(false);
    };

    const handleManagePassword = () => {
        setManagePasswordOpen(true);
    };

    const handleClosePassword = () => {
        setManagePasswordOpen(false);
    };

    const handleCheckboxChange = (event) => {
        setisAdmin(event.target.checked);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
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
                        <h2 >OLÁ, {username.toUpperCase()}!</h2>
                        <IconButton onClick={handleUserMenu}>
                            <PersonIcon sx={{ fontSize: 40, color: 'var(--branco)', marginRight: 0, marginTop: -2.5 }} />
                        </IconButton>
                    </div>
                    <div className='secondUser'>
                        <Button disableRipple onClick={handleManageUsers} className={!isUserAdmin ? 'hidden' : ''}>GERENCIAR USUÁRIOS</Button>
                        <Button disableRipple onClick={handleManagePassword} className={!isUserAdmin ? 'hidden' : ''}>REDEFINIR SENHA DE USUÁRIO</Button>
                        <Button disableRipple onClick={handleLogout}>SAIR</Button>
                    </div>
            </ Drawer>

            <Modal open={manageUsersOpen} onClose={handleCloseModal}>
                <Box className="modal-box">
                    <div className="modalUser">
                        <h2>ADICIONE UM NOVO USUÁRIO</h2>
                        <div className='formUser'>
                            <div className='containerUser'>
                                <form onSubmit={handleSubmitCreateUser}>
                                    <div className='input-field'>
                                        <input type='name' placeholder='NOME' onChange={(e) => setName(e.target.value)} autoComplete="off"></input>
                                    </div>
                                    <div className='input-field'>
                                        <input type='email' placeholder='EMAIL' onChange={(e) => setEmail(e.target.value)} autoComplete="off"></input>
                                    </div>
                                    <div className='input-field'>
                                        <input type='password' placeholder='SENHA' onChange={(e) => setPassword(e.target.value)} autoComplete="off"></input>
                                    </div>
                                    <div className="bln-admin">
                                        <label>
                                            <input type="checkbox" onChange={handleCheckboxChange}/>
                                            ADMINISTRADOR
                                        </label>
                                    </div>

                                    <button>CONFIRMAR</button>
                                </form>
                            </div>  
                        </div>
                        <h2>USUÁRIOS</h2>
                        <div className='users-list'>
                            {users.map((user) => (
                                <div key={user.email} className="user-card">
                                    <IconButton onClick={() => handleDeleteUser(user.email)}>
                                        <CloseIcon sx={{color: 'var(--branco)'}}/>
                                    </IconButton>
                                    <p>{user.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Box>
            </Modal>

            <Modal open={managePasswordOpen} onClose={handleClosePassword}>
                <Box className="modal-box">
                    <div className="modalUserPassword">
                        <h2>REDEFINIR SENHA DE USUÁRIO</h2>
                        <div className='formUserPassword'>
                            <div className='containerUser'>
                                <form onSubmit={handleSubmitUpdatePassword}>
                                    <div className='input-field'>
                                        <input type='email' placeholder='EMAIL' onChange={(e) => setEmail(e.target.value)} autoComplete="off"></input>
                                    </div>
                                    <div className='input-field'>
                                        <input type='password' placeholder='NOVA SENHA' onChange={(e) => setNewPassword(e.target.value)} autoComplete="off"></input>
                                    </div>

                                    <button >REDEFINIR</button>
                                </form>
                            </div>  
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
  
export default UserMenu;
  