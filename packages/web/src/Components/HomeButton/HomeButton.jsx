import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './HomeButton.css'

function HomeButton() {
    const navigate = useNavigate()

    const handleHomeClick = () => {
        navigate('/home')
    }

    return (
        <button className="home-button" title="Home" onClick={handleHomeClick}>
            <img src={logo} alt="Home" className="home-icon" />
        </button>
    )
}

export default HomeButton
