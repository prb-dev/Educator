import React, { useState } from 'react';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform signup logic here, e.g., call an API to create a new user
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Email:', email);
    };

    return (
        <div className=' top-56'>
            <h1 className="text-5xl text-center text-gray-100">Signup</h1>
            <form onSubmit={handleSubmit} className="text-center mt-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="block mx-auto w-1/3 py-2 px-4 rounded-md mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="block mx-auto w-1/3 py-2 px-4 rounded-md mb-4"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="block mx-auto w-1/3 py-2 px-4 rounded-md mb-4"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
