import { useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
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
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
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
      // Axios catches any response outside the 2xx range in the catch block
      if (err.response && err.response.data) {
        // Populates validation issues returned by Django REST Framework
        setErrors(err.response.data);
      } else {
        setErrors({ detail: "Network error. Please make sure your backend server is running." });
      }
    }
  };

return (
  <>
    {success && <p style={{ color: 'green', fontWeight: 'bold' }}>Registration successful!</p>}
    {errors?.detail && <p style={{ color: 'red' }}>{errors.detail}</p>}

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



/*
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    setLoading(true);
    // Calling e.preventDefault() tells the browser: "Hey, don't do your default behavior.
    // Let me handle this submission manually with JavaScript instead."
    // This is crucial in modern web apps (like React or Vue) where you want to send data
    // to an API in the background without making the whole page reload.
    e.preventDefault();

    try {

    console.log(email)
    console.log(firstname)
    console.log(lastname)
    console.log(password)

      const res = await api.post("/api/register/", { email, firstname, lastname, password });
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <form onSubmit={handleSubmit} id="registration-form" className="space-y-4">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-gray-500 text-sm mb-1">
          Email
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          type="email"
          value={email}
          // name="email"
          // id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
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
          value={firstname}
          // name="first_name"
          // id="first_name-register"
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="First Name"
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
          value={lastname}
          // name="last_name"
          // id="last_name-register"
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Last Name"
          // autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="password-register" className="block text-gray-500 text-sm mb-1">
          Password
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          type="password"
          value={password}
          // name="password"
          // id="password-register"
          onChange={(e) => setPassword(e.target.value)}
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
          value={confirmPassword}
          // name="password"
          // id="password-register-confirm"
          onChange={(e) => setConfirmPassword(e.target.value)}
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
  )
};

export default RegisterForm;
*/

  // <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
  //     <h2>Create Account</h2>
      
  //     {success && <p style={{ color: 'green', fontWeight: 'bold' }}>Registration successful!</p>}
  //     {errors?.detail && <p style={{ color: 'red' }}>{errors.detail}</p>}

      
  //     <form onSubmit={handleSubmit}>
  //       <div style={{ marginBottom: '15px' }}>
  //         <label style={{ display: 'block' }}>First Name:</label>
  //         <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
  //         {errors?.first_name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.first_name[0]}</span>}
  //       </div>

  //       <div style={{ marginBottom: '15px' }}>
  //         <label style={{ display: 'block' }}>Last Name:</label>
  //         <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
  //         {errors?.last_name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.last_name[0]}</span>}
  //       </div>

  //       <div style={{ marginBottom: '15px' }}>
  //         <label style={{ display: 'block' }}>Email:</label>
  //         <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
  //         {errors?.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email[0]}</span>}
  //       </div>

  //       <div style={{ marginBottom: '15px' }}>
  //         <label style={{ display: 'block' }}>Password:</label>
  //         <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
  //         {errors?.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password[0]}</span>}
  //       </div>

  //       <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
  //         Register
  //       </button>
  //     </form>
  //   </div>
