import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Provider } from 'react-redux';
import store from './redux'


const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    
    html, body {
        margin: 0;
    }

    body {
        font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
    }
`;

const container = document.getElementById('root');
if (!container) {
    throw new Error("Root container element not found.")
}




ReactDOM.render(
    <BrowserRouter>
        <GlobalStyle />
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    container
);