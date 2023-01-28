import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = () => {
  let element = document.getElementById('root')

  if (!element) {
    element = document.createElement('div')
    element.setAttribute('id', 'root')
    document.body.appendChild(element)
  }

  return element
}
const root = ReactDOM.createRoot(rootElement());

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);