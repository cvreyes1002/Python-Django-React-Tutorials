import React, { useState } from "react";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// import { useNavigate } from "react-router-dom";
import api from "../api";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    confirmPassword: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    localStorage.clear();

    try {
      // Axios automatically stringifies formData to JSON and sets Content-Type header
      // const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
      const response = await api.post("/api/register/", formData);

      if (response.status === 201) {
        setSuccess(true);
        // Clear out the form fields on success
        setFormData({ email: '', password: '', first_name: '', last_name: '' , confirmPassword: '' }); 
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // TypeScript now knows `err` is an AxiosError
        const apiError =
          err.response?.data?.detail ||
          (err.response?.data ? JSON.stringify(err.response.data) : null) ||
          err.message;

        setError(apiError);
      } else {
        // Handles non-Axios runtime errors (e.g., standard JS Errors)
        setError("Network Error. Please try again");
      }
    }
  };

return (
  <>
    {success && <p style={{ color: 'green', fontWeight: 'bold' }}>Registration successful!</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-500 text-sm mb-1">
          Email
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          type="email"
          value={formData.email}
          name="email"
          // id="email"
          onChange={handleChange}
          placeholder="you@example.com"
          required
          // autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="first_name-register" className="block text-gray-500 text-sm mb-1">
          First Name
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          type="text"
          value={formData.first_name}
          name="first_name"
          // id="first_name-register"
          onChange={handleChange}
          placeholder="First Name"
          required
          // autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="last_name-register" className="block text-gray-500 text-sm mb-1">
          Last Name
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          type="text"
          value={formData.last_name}
          name="last_name"
          // id="last_name-register"
          onChange={handleChange}
          placeholder="Last Name"
          // autoComplete="off"
          required
        />
      </div>

      <div>
        <label htmlFor="password-register" className="block text-gray-500 text-sm mb-1">
          Password
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          type="password"
          value={formData.password}
          name="password"
          // id="password-register"
          onChange={handleChange}
          placeholder="Create a password"
        />
      </div>

      <div>
        <label htmlFor="password-register-confirm" className="block text-gray-500 text-sm mb-1">
          Confirm Password
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          type="password"
          value={formData.confirmPassword}
          name="confirmPassword"
          // id="password-register-confirm"
          onChange={handleChange}
          placeholder="Confirm password"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-6 bg-green-600 hover:bg-green-700 text-white font-medium text-lg rounded-md transition duration-150 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Sign up for Blog App
      </button>
    </form>
  </>
  );
};

export default Register;



