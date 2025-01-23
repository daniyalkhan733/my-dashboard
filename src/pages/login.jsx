import React, { useState } from 'react';
import { Eye, EyeOff, ChevronRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempted with:', { email, password });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
          </svg>
          <h2 className="mt-6 text-3xl font-semibold text-gray-900">Sign in with Apple ID</h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={`w-full px-4 py-3 border-2 rounded-xl text-gray-900 focus:outline-none transition-colors duration-200 ease-in-out
                  ${emailFocused ? 'border-blue-500' : 'border-gray-200'}`}
                placeholder="Apple ID"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={`w-full px-4 py-3 border-2 rounded-xl text-gray-900 focus:outline-none transition-colors duration-200 ease-in-out
                  ${passwordFocused ? 'border-blue-500' : 'border-gray-200'}`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out"
            >
              <span className="absolute right-3 inset-y-0 flex items-center">
                <ChevronRight className="h-5 w-5" />
              </span>
              Continue
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center">
            <a
              href="#"
              className="font-medium text-blue-500 hover:text-blue-600 transition-colors duration-200 ease-in-out"
            >
              Forgot Apple ID or Password?
            </a>
          </div>

          {/* Create Account Link */}
          <div className="text-center text-sm">
            <span className="text-gray-500">Don't have an Apple ID? </span>
            <a
              href="#"
              className="font-medium text-blue-500 hover:text-blue-600 transition-colors duration-200 ease-in-out"
            >
              Create yours now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;