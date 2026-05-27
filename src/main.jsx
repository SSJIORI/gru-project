import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/index.css';

const rootElement = document.getElementById('root');

const renderFallback = (error) => {
  const message = error?.stack || error || 'Unknown error';
  const target = rootElement || document.body;
  target.innerHTML = `
    <main style="min-height:100vh;background:#08111f;color:#fff;padding:32px;font-family:Inter,system-ui">
      <h1 style="font-size:28px;font-weight:800">Frontend mount failed</h1>
      <pre style="white-space:pre-wrap;margin-top:16px;color:#f4a7bb">${message}</pre>
    </main>
  `;
};

if (!rootElement) {
  renderFallback('Missing #root element in index.html');
} else {
  try {
    const root = createRoot(rootElement);
    flushSync(() => {
      root.render(
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>,
      );
    });
  } catch (error) {
    renderFallback(error);
  }
}
