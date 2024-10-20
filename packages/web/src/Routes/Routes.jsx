/* eslint-disable react/prop-types */

import { Fragment } from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "../Pages/Login/Login.jsx"
import App from "../Pages/Home/Home.jsx"
import Search from "../Pages/Search/Search.jsx"

const RoutesApp = () => {
    const isAuthenticated = () => {
        return !!localStorage.getItem('token')
    }

    const ProtectedRoute = ({ element }) => {
        return isAuthenticated() ? element : <Navigate to="/login" />
    }

    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/login" element={<Login />}/>
                    <Route path="*" element={<Login />}/>
                    <Route exact path="/home" element={<ProtectedRoute element={<App />}/>}/>
                    <Route exact path="/search" element={<ProtectedRoute element={<Search />}/>}/>
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

export default RoutesApp
