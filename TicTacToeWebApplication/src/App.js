import React, { useState, useEffect } from 'react';
import './App.css';
import Game from './components/Game';

/**
 * App component that provides a themed shell and renders the Tic Tac Toe Game.
 * Includes a theme toggle button and applies the theme to the document element.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Apply theme to document element for CSS variable theming
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          data-testid="theme-toggle"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <main className="container" role="main" aria-label="Tic Tac Toe Application">
          <h1 className="title" data-testid="app-title">Tic Tac Toe</h1>
          <p className="subtitle">
            Two players take turns. First to get three in a row wins.
          </p>
          <Game />
        </main>
      </header>
    </div>
  );
}

export default App;
