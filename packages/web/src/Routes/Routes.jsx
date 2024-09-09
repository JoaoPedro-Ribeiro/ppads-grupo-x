import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../Pages/Login/Login.jsx"
import Redefine from "../Pages/Redefine/Redefine.jsx";
import App from "../Pages/App/App.jsx";

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
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;