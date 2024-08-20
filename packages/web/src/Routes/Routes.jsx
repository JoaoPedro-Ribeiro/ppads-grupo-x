import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../Pages/Login/Login.jsx"

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/login" element={<Login />}/>
                    <Route path="*" element={<Login />}/>
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;