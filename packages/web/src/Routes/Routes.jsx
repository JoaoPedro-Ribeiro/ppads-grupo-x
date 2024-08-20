import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../Pages/Login/Login.jsx"
import Redefine from "../Pages/Redefine/Redefine.jsx";

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/login" element={<Login />}/>
                    <Route path="*" element={<Login />}/>
                    <Route exact path="/redefine" element={<Redefine />}/>
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;