import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logintitle from '../../Components/Logintitle/Logintitle';
import api from '../../services/axios';
import { apiBaseUrl } from '../../../externalUrls';
import './Login.css';

// Componente funcional Login
const Login = () => {
  // Definindo estados para armazenar valores de entrada e mensagens de erro
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Hook para navegação programática
  const navigate = useNavigate();

  // Função para lidar com a mudança do checkbox "Manter Conectado"
  const handleCheckboxChange = (event) => {
    setStayLoggedIn(event.target.checked);
  };

  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      const url = `${apiBaseUrl}/auth/login`; // URL da API de login
      const loginData = {
        email: username,
        password: password,
        stayLoggedIn: stayLoggedIn
      };

      // Fazendo a requisição POST para a API de login
      const response = await api.post(url, loginData);

      if (response.data.token) {
        const jwtToken = response.data.token;

        // Armazenando o token JWT no localStorage
        localStorage.setItem('token', jwtToken);

        // Navegando para a página inicial após o login bem-sucedido
        navigate('/home');
      } else {
        setErrorMessage('Login falhou. Verifique suas credenciais.'); // Mensagem de erro se o login falhar
      }
    } catch (error) {
      setErrorMessage('Erro ao fazer login. Tente novamente.'); // Mensagem de erro se ocorrer um erro na requisição
      console.log('Erro ao fazer login: ', error); // Log do erro no console
    }
  };

  return (
    <main>
      <div className="LoginPage">
        <Logintitle /> {/* Componente de título do login */}
        <div className="formLogin">
          <div className="container">
            <form onSubmit={handleSubmit}> {/* Formulário de login */}
              <h2>LOGIN</h2>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="EMAIL"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                /> {/* Campo de entrada para email */}
              </div>
              <div className="input-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="SENHA"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                /> {/* Campo de entrada para senha */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? '🙈' : '👁️'} {/* Ícone para mostrar/ocultar senha */}
                </span>
              </div>

              <div className="recall-forget">
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={stayLoggedIn}
                  />
                  MANTER CONECTADO {/* Checkbox para manter o usuário conectado */}
                </label>
              </div>
              {errorMessage && (
                <p style={{ color: 'red' }}>{errorMessage}</p>
              )} {/* Mensagem de erro, se houver */}
              
              <button type="submit">ENTRAR</button> {/* Botão de envio do formulário */}
            </form>
          </div>  
        </div>
      </div>
    </main>
  );
};

export default Login; // Exportando o componente Login
