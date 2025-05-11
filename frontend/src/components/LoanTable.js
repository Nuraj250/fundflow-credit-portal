/**
  
 * @file LoanTable.jsx
 * @description Reusable table component to display list of loans
 * - Shows basic loan info: customer, amount, score, status, and recommendation
 * - Provides edit and delete action buttons per loan row
 *
 * @props {Array} loans - Array of loan objects
 * @props {Function} onEdit - Handler for editing a loan (receives loan object)
 * @props {Function} onDelete - Handler for deleting a loan (receives loan ID)
   */

export default function LoanTable({ loans, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <thead className="bg-white/10 text-white">
                    <tr>
                        <th className="px-4 py-2">Customer</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Score</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Recommendation</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan._id} className="text-center text-white border-t border-white/10">
                            <td className="px-4 py-2">{loan.customerId?.name || '—'}</td>
                            <td className="px-4 py-2">{loan.loanAmount}</td>
                            <td className="px-4 py-2">{loan.score}</td>
                            <td className="px-4 py-2">{loan.status}</td>
                            <td className="px-4 py-2">{loan.recommendation}</td>
                            <td className="px-4 py-2 space-x-2">
                                <button
                                    onClick={() => onEdit(loan)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(loan._id)}
                                    className="bg-red-600 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
