import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic validation
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost/job-portal-api/authentication/register.php',
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            alert(response.data.message); // Show success message
            setFormData({ name: '', email: '', password: '', role: 'student' }); // Reset form
        } catch (error) {
            setError(error.response?.data?.message || "Error registering user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password (min. 6 chars)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="company">Company</option>
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
