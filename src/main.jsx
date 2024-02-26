import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router.jsx'
import { Provider } from 'react-redux'
import setupStore from './redux/store.js'
import './static/styles/index.scss'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Router/>
    </Provider>
  </BrowserRouter>
)
