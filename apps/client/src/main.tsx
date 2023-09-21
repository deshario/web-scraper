import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const node = document.getElementById('root')

const root = ReactDOM.createRoot(node!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
