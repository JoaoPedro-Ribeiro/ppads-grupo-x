import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../Pages/Login/Login.jsx"
import Redefine from "../Pages/Redefine/Redefine.jsx";
import App from "../Pages/Home/Home.jsx";
import Search from "../Pages/Search/Search.jsx"

//TO DO: aplicar validações de login (se user existe, erros, token, logar, etc..)

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/login" element={<Login />}/>
                    <Route path="*" element={<Login />}/>
                    <Route exact path="/redefine" element={<Redefine />}/>
                    <Route exact path="/home" element={<App />}/>
                    <Route exact path="/search" element={<Search />}/>
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;