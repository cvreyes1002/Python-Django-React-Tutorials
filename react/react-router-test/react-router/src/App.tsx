import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav style={{ 
        padding: '15px', 
        backgroundColor: '#282c34', 
        display: 'flex', 
        gap: '15px' 
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>About</Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Contact</Link>
      </nav>

      {/* Route Switchboard */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
