import { useState } from 'react';
import api from './api';
import { useAuth } from './AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  if (!isOpen) return null; // Render nothing if the modal is closed

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // const { login } = useAuth();

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await api.post("api/login", { email, password });

      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);


    } catch (error) {

    } finally {
      setLoading(false);
    }
    





    if (email && password) {
      // login({ name: email.split('@')[0], email });  // 3. Trigger global login context update







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

export default LoginModal;