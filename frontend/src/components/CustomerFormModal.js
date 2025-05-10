import { useState, useEffect } from 'react';

export default function CustomerFormModal({ isOpen, onClose, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: '',
        NIC: '',
        email: '',
        password: '',
        monthlyIncome: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                NIC: initialData.NIC || '',
                email: initialData.email || '',
                monthlyIncome: initialData.monthlyIncome || '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-60" style={{ position: 'relative', top: '20px' }}>
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl w-2xl max-w-md border border-white/20 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-4">
                    {initialData ? 'Edit Customer' : 'Add Customer'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
                    />
                    <input
                        type="text"
                        name="NIC"
                        value={formData.NIC}
                        onChange={handleChange}
                        placeholder="NIC"
                        required
                        className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required={!initialData} 
                        className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
                    />
                    <input
                        type="number"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleChange}
                        placeholder="Monthly Income"
                        required
                        className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
                    />
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                            {initialData ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
