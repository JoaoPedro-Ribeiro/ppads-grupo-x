import './Home.css'
import Menu from '../../Components/Menu/Menu.jsx'
import UserMenu from '../../Components/UserMenu/UserMenu.jsx'
import SearchBar from '../../Components/SearchBar/SearchBar.jsx'
import Add from '../../Components/Add/Add.jsx'

function Home() {
  return (
    <div className="Home">
      <div className="Bar">
        <Menu />
        <UserMenu />
      </div>
      <div className="HomeBody">
        <SearchBar />
        <Add />
      </div>
    </div>
  )
}

export default Home
