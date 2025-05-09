import { useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

export default function Register() {
    const [form, setForm] = useState({ email: '', password: '', role: 'customer' });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await api.post('/auth/register', form);
        localStorage.setItem('token', res.data.token);
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md space-y-4" onSubmit={handleSubmit}>
                <h1 className="text-xl font-bold">Register</h1>
                <input type="email" placeholder="Email" className="w-full border p-2"
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" className="w-full border p-2"
                    onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <select className="w-full border p-2"
                    onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="bg-green-600 text-white w-full py-2 rounded">Register</button>
            </form>
        </div>
    );
}
