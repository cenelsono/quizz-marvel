import '../../App.css';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import Header from "../Header/Header";
import Home from "../../Container/Home/Home";
import Footer from "../Footer/Footer";
import Welcome from "../../Container/Welcome/Welcome";
import Login from "../../Container/Login/Login";
import SignUp from "../../Container/SignUp/SignUp";
import ErrorPage from "../../Container/ErrorPage/ErrorPage";
import {AuthContext, AuthContextProvider} from '../../Context/AuthContextProvider.js';
import ForgetPassword from "../../Container/ForgetPassword/ForgetPassword";
import {IconContext} from "react-icons";
import {useContext} from "react";
import Score from "../../Container/Score/Score";

const ProtectedRoute = ({redirectPath = '/'}) => {
    const {value: {userSession}} = useContext(AuthContext);
    if (!userSession) {
        return <Navigate to={redirectPath} replace/>;
    }
    return <Outlet/>;
};

function App() {

    return (
        <BrowserRouter className="App">
            <AuthContextProvider>
                <IconContext.Provider value={{style: {verticalAlign: 'middle'}}}>
                    <Header/>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/signup' element={<SignUp/>}/>
                        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
                        <Route path='/*' element={<ErrorPage/>}/>
                        <Route path='/welcome' element={<Welcome/>}/>
                        <Route element={<ProtectedRoute/>}>
                            <Route path='/welcome' element={<Welcome/>}/>
                            <Route path='/scores' element={<Score/>}/>
                        </Route>
                    </Routes>
                    <Footer/>
                </IconContext.Provider>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;
