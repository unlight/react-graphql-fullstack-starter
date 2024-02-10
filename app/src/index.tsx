import { App } from './App';
import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#app')!);
root.render(<App />);
