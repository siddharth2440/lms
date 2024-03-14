import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import {  ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import store from './Redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ColorModeScript/>
      <ChakraProvider>
        <BrowserRouter>
            <App />
        <Toaster/>
        </BrowserRouter>
      </ChakraProvider>
  </Provider>
)
