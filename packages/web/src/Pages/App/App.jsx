import './App.css';
import Menu from '../../Components/Menu/Menu.jsx';
import UserMenu from '../../Components/UserMenu/UserMenu.jsx';
import Search from '../../Components/Search/Search.jsx';
import Add from '../../Components/Add/Add.jsx';

function App() {
  return (
    <div className="AppHome">
      <div className="AppBar">
        <Menu />
        <UserMenu />
      </div>
      <div className="App">
        <Search />
        <Add />
      </div>
    </div>
  );
}

export default App;
