// // src/main.jsx

import { ThemeProvider } from "./context/ThemeContext";
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Just <App />
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
