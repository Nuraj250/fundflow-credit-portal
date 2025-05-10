export default function LoanTable({ loans }) {
    return (
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">Applicant</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">Score</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Recommendation</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan._id} className="text-center">
                            <td className="border px-4 py-2">{loan.customerId?.name || '—'}</td>
                            <td className="border px-4 py-2">{loan.loanAmount}</td>
                            <td className="border px-4 py-2">{loan.score}</td>
                            <td className="border px-4 py-2">{loan.status}</td>
                            <td className="border px-4 py-2">{loan.recommendation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
