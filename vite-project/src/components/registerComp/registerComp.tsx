import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../types/User";
import { addUser } from "../../store/features/usersSlice/usersSlice";
import { AppDispatch, RootState } from "../../store/store";
import "./registerComp.css";
const Register: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const { error, status } = useSelector((state: RootState) => state.users);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();  // למניעת ריענון העמוד
        const newUser: Partial<User> = {
            username: name,
            password: password,
            isAdmin: false
        };
        dispatch(addUser(newUser));
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p className="error-message">Error: {error}</p>}
            <form onSubmit={handleRegister} className="register-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                />
                <br />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <br />
                <br />
                <button type="submit" disabled={status === 'loading'} className="register-button">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
