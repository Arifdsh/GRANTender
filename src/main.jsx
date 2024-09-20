import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider} from 'react-redux'
import {store } from './app/store.js'
import AppWrapper from "./AppWrapper"; 


createRoot(document.getElementById('root')).render(

    <Provider store={store}>
        <AppWrapper />
    </Provider>
)
