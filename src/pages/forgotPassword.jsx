import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useForgotPasswordMutation } from '../api/authenticationApi';
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const { mutate, isLoading } = useForgotPasswordMutation();

    // Encryption key - keep this secure and consistent on both client and server
    const encryptionKey = import.meta.env.VITE_CRYPTO_SECRET;
    console.log(window.location.origin);

    const handleSubmit = (event) => {
        event.preventDefault();
        toast('Submitting request...');

        

        // Encrypt the email
        const encryptedEmail = CryptoJS.AES.encrypt(email, encryptionKey).toString();

        // Payload with encrypted email
        const payload = {
            email,
            link:`${window.location.origin}/reset-password?token=${encryptedEmail}`,
        };
        
        mutate(payload, {
            onSuccess: () => {
                toast.success('Password reset link sent to your email');
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message || 'An error occurred');
            },
        });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 border-2 rounded-md border-black">
            <div className="w-full max-w-md space-y-8">
                <div className="justify-center align-middle flex">
                    <img src="/assets/images/logo.png" className="h-20 w-20 bg-black rounded-full" alt="" />
                </div>
                <h2 className="mt-6 text-3xl font-semibold text-gray-900 flex justify-center">Forgot Password</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter your email address, and we will send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent font-medium rounded-xl text-white bg-primary hover:bg-secondary2 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 ease-in-out text-xl"
                        >
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/login"
                            className="font-medium text-blue-500 hover:text-blue-600 transition-colors duration-200 ease-in-out"
                        >
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
