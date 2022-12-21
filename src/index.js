import React,{createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import {auth} from './Firebase/firebaseConfig';
import AuthContextProvider from './Context/AuthContextProvider.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
      <App />
  </>
);

