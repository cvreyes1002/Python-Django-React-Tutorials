import { useState, useEffect } from 'react';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  // 1. Initialize state with the current browser URL path
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // 2. Custom navigation function to update the URL without page reload
  const navigate = (path) => {
    window.history.pushState({}, '', path); // Updates browser address bar
    setCurrentPath(path);                  // Triggers React re-render
  };

  // 3. Listen to browser Back/Forward button clicks
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 4. Conditional rendering logic (Acts like <Routes>)
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Home />;
      case '/about':
        return <About />;
      case '/contact':
        return <Contact />;
      default:
        return <h1 style={{ padding: '20px' }}>404 - Page Not Found 😢</h1>;
    }
  };

  return (
    <div>
      {/* Navigation Bar (Acts like <Link>) */}
      <nav style={{ 
        padding: '15px', 
        backgroundColor: '#282c34', 
        display: 'flex', 
        gap: '15px' 
      }}>
        <button onClick={() => navigate('/')} style={navButtonStyle}>Home</button>
        <button onClick={() => navigate('/about')} style={navButtonStyle}>About</button>
        <button onClick={() => navigate('/contact')} style={navButtonStyle}>Contact</button>
      </nav>

      {/* Main Content Area */}
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

// Simple styling object for the buttons to look like links
const navButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '16px',
  padding: '0'
};
