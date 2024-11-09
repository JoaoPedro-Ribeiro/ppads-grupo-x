import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logintitle from '../../Components/Logintitle/Logintitle'
import api from '../../services/axios'
import { apiBaseUrl } from '../../../externalUrls'
import './Login.css'
import { Snackbar, Button } from '@mui/material'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [stayLoggedIn, setStayLoggedIn] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const navigate = useNavigate()

  const handleCheckboxChange = (event) => {
    setStayLoggedIn(event.target.checked)
    }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSnackbarOpen(true)

    try {
      const url = `${apiBaseUrl}/auth/login`
      const loginData = {
        email: username,
        password: password,
        stayLoggedIn: stayLoggedIn
      }

      const response = await api.post(url, loginData)

      if (response.data.token) {
        const jwtToken = response.data.token

        localStorage.setItem('token', jwtToken)

        navigate('/home')
      } else {
        setErrorMessage("Login falhou. Verifique suas credenciais.")
      }
    } catch {
      setErrorMessage("Erro ao fazer login. Tente novamente.")
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
  <main>
    <div className='LoginPage'>
      <Logintitle />
      <div className='formLogin'>
        <div className='container'>
          <form onSubmit={handleSubmit}>
          <h2>LOGIN</h2>
          <div className='input-field'>
            <input type='email' placeholder='EMAIL' onChange={(e) => setUsername(e.target.value)} value={username}></input>
          </div>
          <div className='input-field'>
            <input type='password' placeholder='SENHA' onChange={(e) => setPassword(e.target.value)} value={password}></input>
          </div>

          <div className="recall-forget">
            <label>
              <input type="checkbox" onChange={handleCheckboxChange} />
              MANTER CONECTADO
            </label>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <button>ENTRAR</button>
          </form>
        </div>
      </div>
    </div>

    <Snackbar
      open={snackbarOpen}
      onClose={handleSnackbarClose}
      message="Aguarde 1 minuto após a 1º tentativa de login para o início do servidor."
      action={
        <Button color="inherit" onClick={handleSnackbarClose}>
          Fechar
        </Button>
      }
      autoHideDuration={6000}
    />
  </main>
  )
}

export default Login
