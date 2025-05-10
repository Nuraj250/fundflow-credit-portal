export default function CustomerTable({ customers, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">NIC</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Income</th>
                        <th className="border px-4 py-2">Score</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => (
                        <tr key={c._id} className="text-center">
                            <td className="border px-4 py-2">{c.name}</td>
                            <td className="border px-4 py-2">{c.NIC}</td>
                            <td className="border px-4 py-2">{c.email}</td>
                            <td className="border px-4 py-2">{c.monthlyIncome}</td>
                            <td className="border px-4 py-2">{c.creditScore}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => onDelete(c._id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
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
