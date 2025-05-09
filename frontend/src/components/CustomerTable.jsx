const CustomerTable = ({ customers, onDelete, onEdit }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">NIC</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Income</th>
                        <th className="py-2 px-4 border">Score</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((cust) => (
                        <tr key={cust._id} className="text-center">
                            <td className="py-2 px-4 border">{cust.name}</td>
                            <td className="py-2 px-4 border">{cust.NIC}</td>
                            <td className="py-2 px-4 border">{cust.email}</td>
                            <td className="py-2 px-4 border">{cust.monthlyIncome}</td>
                            <td className="py-2 px-4 border">{cust.creditScore}</td>
                            <td className="py-2 px-4 border">
                                <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => onDelete(cust._id)}>Delete</button>
                                <button className="bg-yellow-500 text-white px-2 py-1 ml-2 rounded" onClick={() => onEdit(cust)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;
