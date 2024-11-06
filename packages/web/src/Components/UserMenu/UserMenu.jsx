import { useState, useEffect } from 'react'
import { IconButton, Modal, Box, Button, Drawer, Snackbar, Alert } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import api from '../../services/axios'
import { jwtDecode } from 'jwt-decode'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import { apiBaseUrl } from '../../../externalUrls'
import './UserMenu.css'

function UserMenu() {
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [manageUsersOpen, setManageUsersOpen] = useState(false)
    const [managePasswordOpen, setManagePasswordOpen] = useState(false)
    const [username, setUsername] = useState("USUÁRIO")
    const [isUserAdmin, setIsUserAdmin] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isAdmin, setisAdmin] = useState(false)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    useEffect(() => {
        const jwtToken = localStorage.getItem('token')
        if (jwtToken) {
            const tokenPayload = jwtDecode(jwtToken)
            setUsername(tokenPayload.name)
            setIsUserAdmin(tokenPayload.isAdmin)
            setUserEmail(tokenPayload.email)
        }
    }, [])

    useEffect(() => {
        if (isUserAdmin) {
            fetchUsers()
        }
    }, [isUserAdmin, userEmail])

    const fetchUsers = async () => {
        try {
            const response = await api.get(`${apiBaseUrl}/users/getAllUsers`, {})
            const filteredUsers = response.data.data.filter(user => user.email !== userEmail)
            setUsers(filteredUsers)
        } catch (error) {
            console.error("Erro ao buscar usuários:", error)
            if (error.response.status === 401) {
                handleLogout()
            }
        }
    }

    const handleSubmitCreateUser = async (event) => {
        event.preventDefault()

        try {
            const url = `${apiBaseUrl}/users/createUser`

            const userData = {
                name: name,
                email: email,
                password: password,
                isAdmin: isAdmin
            }
            const response = await api.post(url, userData)
            if (response.data.success) {
                handleSnackbarOpen('Usuário criado com sucesso!', 'success')
                fetchUsers()
                setEmail("")
                setName("")
                setPassword("")
                setisAdmin(false)
                setManageUsersOpen(false)
            } else {
                handleSnackbarOpen(`Erro ao criar usuário: ${response.data.message}`, 'error')
            }
        } catch (error) {
            console.error("Erro ao criar usuário:", error.response ? error.response.data : error.message)
            handleSnackbarOpen(`Erro ao criar usuário: ${error.response?.data?.message || 'Something went wrong'}`, 'error')
            if (error.response.status === 401) {
                handleLogout()
            }
        }
    }

    const handleSubmitUpdatePassword = async (event) => {
        event.preventDefault()

        try {
            const url = `${apiBaseUrl}/auth/updatePassword`
            const passwordData = {
                email: email,
                newPassword: newPassword
            }

            const response = await api.put(url, passwordData)

            if (response.data.success) {
                handleSnackbarOpen('Senha atualizada com sucesso!', 'success')
                setEmail('')
                setNewPassword('')
                setManagePasswordOpen(false)
            } else {
                handleSnackbarOpen(`Erro ao atualizar senha: ${response.data.message}`, 'error')
            }
        } catch (error) {
            console.error("Erro ao redefinir senha:", error)
            handleSnackbarOpen(`Erro ao atualizar senha: ${error.response?.data?.message || 'Something went wrong'}`, 'error')
            if (error.response.status === 401) {
                handleLogout()
            }
        }
    }

    const handleDeleteUser = async (emailToDelete) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                const url = `${apiBaseUrl}/users/deleteUser`
                const response = await api.delete(url, { data: { email: emailToDelete } })
                if (response.data.success) {
                    fetchUsers()
                    handleSnackbarOpen('Usuário excluído com sucesso!', 'success')
                } else {
                    handleSnackbarOpen(`Erro ao excluir usuário: ${response.data.message}`, 'error')
                }
            } catch (error) {
                console.error("Erro ao excluir usuário:", error)
                handleSnackbarOpen(`Erro ao excluir usuário: ${error.response?.data?.message || 'Something went wrong'}`, 'error')
                if (error.response.status === 401) {
                    handleLogout()
                }
            }
        }
    }

    const handleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen)
    }

    const handleManageUsers = () => {
        setManageUsersOpen(true)
    }

    const handleCloseModal = () => {
        setManageUsersOpen(false)
    }

    const handleManagePassword = () => {
        setManagePasswordOpen(true)
    }

    const handleClosePassword = () => {
        setManagePasswordOpen(false)
    }

    const handleCheckboxChange = (event) => {
        setisAdmin(event.target.checked)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const isFormValid = () => {
        return name.trim() !== '' &&
               email.trim() !== '' &&
               password.trim() !== ''
    }

    const isPasswordFormValid = () => {
        return email.trim() !== '' &&
               newPassword.trim() !== ''
    }

    const handleSnackbarOpen = (message, severity) => {
        setSnackbarMessage(message)
        setSnackbarSeverity(severity)
        setSnackbarOpen(true)
    }

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

                                    <button disabled={!isFormValid()}>CONFIRMAR</button>
                                </form>
                            </div>
                        </div>
                        <h2>USUÁRIOS</h2>
                        <div className='users-list'>
                            {users.sort((a, b) => a.email.localeCompare(b.email)).map((user) => (
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
                                        <input
                                            type='email'
                                            placeholder='EMAIL'
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className='input-field'>
                                        <input
                                            type='password'
                                            placeholder='NOVA SENHA'
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <button disabled={!isPasswordFormValid()}>REDEFINIR</button>
                                </form>
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

export default UserMenu
