import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // SIGN UP FORM inputs functionality

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // SUBMIT functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (!data.success) {
        setIsLoading(false);
        setError(data.message);
        return;
      }
      setIsLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer"
        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className="flex gap-s mt-5">
        <p>Already have an account?</p>
        <Link to={'/sign-in'}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}

export default SignUp;
