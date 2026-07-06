import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./style.css"
import { StrictMode } from 'react'
import { store } from './store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <App />
    </Provider>
,)
