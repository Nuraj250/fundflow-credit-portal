const LoanForm = ({ loanData, onChange, onSubmit, loading }) => {
    return (
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
                { name: 'loanAmount', type: 'number', placeholder: 'Loan Amount' },
                { name: 'durationMonths', type: 'number', placeholder: 'Duration (Months)' },
                { name: 'purpose', type: 'text', placeholder: 'Purpose' },
                { name: 'monthlyIncome', type: 'number', placeholder: 'Monthly Income' },
                { name: 'existingLoans', type: 'number', placeholder: 'Existing Loans' }
            ].map(({ name, type, placeholder }) => (
                <input
                    key={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={loanData[name]}
                    onChange={onChange}
                    className="border p-2 rounded"
                    required
                />
            ))}
            <button
                type="submit"
                disabled={loading}
                className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                {loading ? "Submitting..." : "Apply Loan"}
            </button>
        </form>
    );
};

export default LoanForm;
