import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLoginMutation } from '../api/authenticationApi';
import useEncryptedClientData from '../utils/getClient';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const { mutate, isLoading, error } = useLoginMutation();
    const [clientData, setEncryptedClientData] = useEncryptedClientData()

    console.log(clientData);


    const handleSubmit = (event) => {
        event.preventDefault();
        const loginData = {
            user_email: email,
            user_password: password
        };
        toast('Logging in...')
        mutate(loginData, {
            onSuccess: (response) => {
                console.log(response);
                toast.success('Login successful');
                setEncryptedClientData({
                    clientId: response.donor.user_id,
                    clientEmail: response.donor.user_email,
                    clientName: response.donor.first_name
                  });

                  window.location.href = "/dashboard";
          
                // if (response?.data?.token) {
                // }
            }});
    };


    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 border-2 rounded-md border-black">
            <div className="w-full max-w-md space-y-8">
                <div className="justify-center align-middle flex" >
                    <img src="/assets/images/logo.png" className='h-20 w-20 bg-black rounded-full' alt="" />
                </div>
                <h2 className="mt-6 text-3xl font-semibold text-gray-900 flex justify-center">Login To My Sadaqah Online</h2>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
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
                                placeholder="Email"
                            />
                        </div>

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

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent  font-medium rounded-xl text-white bg-primary hover:bg-secondary2 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 ease-in-out text-xl"
                        >

                            Login
                        </button>
                    </div>

                    <div className="text-center">
                        <a
                            href="#"
                            className="font-medium text-blue-500 hover:text-blue-600 transition-colors duration-200 ease-in-out"
                        >
                            Forgot Password?
                        </a>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;