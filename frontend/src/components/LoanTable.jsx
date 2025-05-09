const LoanTable = ({ loans }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 border">Applicant</th>
                        <th className="py-2 px-4 border">Amount</th>
                        <th className="py-2 px-4 border">Score</th>
                        <th className="py-2 px-4 border">Status</th>
                        <th className="py-2 px-4 border">Recommendation</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan._id} className="text-center">
                            <td className="py-2 px-4 border">{loan.customerId?.name}</td>
                            <td className="py-2 px-4 border">{loan.loanAmount}</td>
                            <td className="py-2 px-4 border">{loan.score}</td>
                            <td className="py-2 px-4 border">{loan.status}</td>
                            <td className="py-2 px-4 border">{loan.recommendation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoanTable;
