import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './app'
import store from './redux/store'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <CookiesProvider defaultSetCookies={{ path: '/' }}>
            <App/>
        </CookiesProvider>
    </Provider>)
