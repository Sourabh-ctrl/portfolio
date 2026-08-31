import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import './index.css'
import App from './App.jsx'
import data from './data.js'

document.title = data.meta.title
const metaDescription = document.querySelector('meta[name="description"]')
if (metaDescription) metaDescription.setAttribute('content', data.meta.description)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
