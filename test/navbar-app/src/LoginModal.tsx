import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null; // Render nothing if the modal is closed

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login({ name: email.split('@')[0], email });  // 3. Trigger global login context update

      // onLogin({ name: email.split('@')[0], email }); // Pass user data back[cite: 2]
      setEmail('');
      setPassword('');
      onClose(); // Close modal[cite: 2]
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        
        <h2>Sign In</h2>
        
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn submit-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}