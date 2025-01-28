import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CryptoJS from 'crypto-js';
import { useResetPasswordMutation } from '../api/authenticationApi';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const { mutate } = useResetPasswordMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const encryptionKey = import.meta.env.VITE_CRYPTO_SECRET;

    // Get token and encrypted email from the query parameters
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token').replaceAll(" ", '+');

    // Function to decrypt email
    const decryptEmail = (encryptedEmail) => {
        console.log(encryptedEmail, "samad2");

        try {
            const bytes = CryptoJS.AES.decrypt(encryptedEmail, encryptionKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error('Invalid encrypted email:', error);
            return null;
        }
    };

    // Function to validate if a string is a valid email
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const email = decryptEmail(token);

    console.log(email, "samad");


    // useEffect(() => {
    //     // Redirect to login if email is invalid
    //     if (!email || !isValidEmail(email)) {
    //         toast.error('Invalid or expired link. Redirecting to login...');
    //         navigate('/login');
    //     }
    // }, [email, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!token) {
            toast.error('Invalid or expired link.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        // Mock API call for password reset
        const payload = {
            email,
            token,
            password,
        };

        mutate(payload, {
            onSuccess: () => {
                toast.success('Password reset link sent to your email');
                navigate('/login');
            }
        });

        toast('Resetting your password...');
        setTimeout(() => {
            // Simulate success response
            toast.success('Your password has been reset successfully!');
            navigate('/login');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 border-2 rounded-md border-black">
            <div className="w-full max-w-md space-y-8">
                <div className="justify-center align-middle flex">
                    <img src="/assets/images/logo.png" className="h-20 w-20 bg-black rounded-full" alt="" />
                </div>
                <h2 className="mt-6 text-3xl font-semibold text-gray-900 flex justify-center">Reset Password</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter your new password below.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            className={`w-full px-4 py-3 border-2 rounded-xl text-gray-900 focus:outline-none transition-colors duration-200 ease-in-out
                                ${passwordFocused ? 'border-blue-500' : 'border-gray-200'}`}
                            placeholder="New Password"
                        />
                    </div>

                    <div className="relative">
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onFocus={() => setConfirmPasswordFocused(true)}
                            onBlur={() => setConfirmPasswordFocused(false)}
                            className={`w-full px-4 py-3 border-2 rounded-xl text-gray-900 focus:outline-none transition-colors duration-200 ease-in-out
                                ${confirmPasswordFocused ? 'border-blue-500' : 'border-gray-200'}`}
                            placeholder="Confirm Password"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent font-medium rounded-xl text-white bg-primary hover:bg-secondary2 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 ease-in-out text-xl"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
