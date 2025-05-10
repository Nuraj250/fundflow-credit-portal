export default function LoanForm({ loanData, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
                { name: 'loanAmount', type: 'number', placeholder: 'Loan Amount' },
                { name: 'durationMonths', type: 'number', placeholder: 'Duration (Months)' },
                { name: 'purpose', type: 'text', placeholder: 'Purpose' },
                { name: 'monthlyIncome', type: 'number', placeholder: 'Monthly Income' },
                { name: 'existingLoans', type: 'number', placeholder: 'Existing Loans' },
            ].map(({ name, type, placeholder }) => (
                <input
                    key={name}
                    type={type}
                    name={name}
                    value={loanData[name]}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className="border p-2 rounded"
                />
            ))}
            <button
                type="submit"
                className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Apply Loan
            </button>
        </form>
    );
}
