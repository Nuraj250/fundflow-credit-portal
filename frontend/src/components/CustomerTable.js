export default function CustomerTable({ customers, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <thead className="bg-white/10 text-white">
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">NIC</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Income</th>
                        <th className="px-4 py-2">Score</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => (
                        <tr key={c._id} className="text-center text-white border-t border-white/10">
                            <td className="px-4 py-2">{c.name}</td>
                            <td className="px-4 py-2">{c.NIC}</td>
                            <td className="px-4 py-2">{c.email}</td>
                            <td className="px-4 py-2">{c.monthlyIncome}</td>
                            <td className="px-4 py-2">{c.creditScore}</td>
                            <td className="px-4 py-2 space-x-2">
                                <button
                                    onClick={() => onEdit(c)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(c._id)}
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
