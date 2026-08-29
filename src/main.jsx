import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import data from './data.js'

document.title = data.meta.title
const metaDescription = document.querySelector('meta[name="description"]')
if (metaDescription) metaDescription.setAttribute('content', data.meta.description)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)