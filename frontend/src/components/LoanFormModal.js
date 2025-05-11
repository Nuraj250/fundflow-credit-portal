import { useState, useEffect } from 'react';

export default function LoanFormModal({
    isOpen,
    onClose,
    onSubmit,
    initialData = {},
    customers = [],
    role,
    customerId
}) {
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
                loanAmount: initialData.loanAmount || '',
                durationMonths: initialData.durationMonths || '',
                purpose: initialData.purpose || '',
                monthlyIncome: initialData.monthlyIncome || '',
                existingLoans: initialData.existingLoans || '',
                customerId: initialData.customerId?._id || customerId || '',
            });
        } else {
            setFormData((prev) => ({ ...prev, customerId: customerId || '' }));
        }
    }, [initialData, customerId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        if (e?.preventDefault) e.preventDefault(); // Only call if it's a real event
        console.log('Submitting form data:', formData); // ✅ Debug log
        onSubmit(formData); // This must match the actual data structure
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl w-full max-w-md border border-white/20 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-4">
                    {initialData?._id ? 'Edit Loan' : 'Apply for Loan'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Show customer select only for admin */}
                    {role === 'admin' && (
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
                    )}

                    <input
                        type="number"
                        name="loanAmount"
                        placeholder="Loan Amount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
                    />
                    <input
                        type="number"
                        name="durationMonths"
                        placeholder="Duration (Months)"
                        value={formData.durationMonths}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
                    />
                    <input
                        type="text"
                        name="purpose"
                        placeholder="Purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
                    />
                    <input
                        type="number"
                        name="monthlyIncome"
                        placeholder="Monthly Income"
                        value={formData.monthlyIncome}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
                    />
                    <input
                        type="number"
                        name="existingLoans"
                        placeholder="Existing Loans"
                        value={formData.existingLoans}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
                    />
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                            {initialData?._id ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
