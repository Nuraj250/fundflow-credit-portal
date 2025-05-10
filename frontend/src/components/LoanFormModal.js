import { useState, useEffect } from 'react';

export default function LoanFormModal({ isOpen, onClose, onSubmit, initialData, customers, role }) {
    const [formData, setFormData] = useState({
        customerId: '',
        loanAmount: '',
        durationMonths: '',
        purpose: '',
        monthlyIncome: '',
        existingLoans: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                customerId: initialData.customerId?._id || '',
                loanAmount: initialData.loanAmount || '',
                durationMonths: initialData.durationMonths || '',
                purpose: initialData.purpose || '',
                monthlyIncome: initialData.monthlyIncome || '',
                existingLoans: initialData.existingLoans || '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting loan:', formData); // ✅ Log before submit
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60" style={{ position: 'absolute', top: role === 'admin' ? '30px' : '410px' }}>
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl w-full max-w-md border border-white/20 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-4">
                    {initialData ? 'Edit Loan' : 'Create Loan'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
                    >
                        <option value="">Select Customer</option>
                        {customers.map((cust) => (
                            <option key={cust._id} value={cust._id}>
                                {cust.name}
                            </option>
                        ))}
                    </select>
                    <input type="number" name="loanAmount" placeholder="Loan Amount" value={formData.loanAmount} onChange={handleChange} className="w-full p-2 rounded bg-white/5 text-white border border-white/20" />
                    <input type="number" name="durationMonths" placeholder="Duration (Months)" value={formData.durationMonths} onChange={handleChange} className="w-full p-2 rounded bg-white/5 text-white border border-white/20" />
                    <input type="text" name="purpose" placeholder="Purpose" value={formData.purpose} onChange={handleChange} className="w-full p-2 rounded bg-white/5 text-white border border-white/20" />
                    <input type="number" name="monthlyIncome" placeholder="Monthly Income" value={formData.monthlyIncome} onChange={handleChange} className="w-full p-2 rounded bg-white/5 text-white border border-white/20" />
                    <input type="number" name="existingLoans" placeholder="Existing Loans" value={formData.existingLoans} onChange={handleChange} className="w-full p-2 rounded bg-white/5 text-white border border-white/20" />
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
