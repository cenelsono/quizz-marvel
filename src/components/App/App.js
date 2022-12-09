import '../../App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "../Header/Header";
import Home from "../../Container/Home/Home";
import Footer from "../Footer/Footer";
import Welcome from "../../Container/Welcome/Welcome";
import Login from "../../Container/Login/Login";
import SignUp from "../../Container/SignUp/SignUp";
import ErrorPage from "../../Container/ErrorPage/ErrorPage";
import { AuthContextProvider } from '../../Context/AuthContextProvider.js';
import ForgetPassword from "../../Container/ForgetPassword/ForgetPassword";
import {useContext, useEffect} from "react";

function App() {

    return (
    <BrowserRouter className="App">
        <AuthContextProvider>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/welcome' element={<Welcome/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/forgetpassword' element={<ForgetPassword/>} />
                <Route path='/*' element={<ErrorPage/>} />
            </Routes>
            <Footer/>
        </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
