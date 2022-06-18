import React from 'react';
import {Provider as ReduxProvider} from "react-redux";
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore, compose} from "redux";
import {rootReducer} from "./redux/rootReducer";
import './index.css';
import App from './App';
import "./i18n"

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__  ?  window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
);

const app = (
    <React.StrictMode>
        <ReduxProvider store={store} >
            {/*<AppContextProvider>*/}
            <App/>
            {/*</AppContextProvider>*/}
        </ReduxProvider>
    </React.StrictMode>
)
ReactDOM.render(app, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();