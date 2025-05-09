import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const AdminDashboard = () => {
    const { token, logout } = useAuth();
    const [customers, setCustomers] = useState([]);
    const [loans, setLoans] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');

    const fetchCustomers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/customers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCustomers(res.data);
        } catch (err) {
            console.error('Failed to fetch customers', err.message);
        }
    };

    const fetchLoans = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/loans`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLoans(res.data);
        } catch (err) {
            console.error('Failed to fetch loans', err.message);
        }
    };

    const handleDeleteCustomer = async (id) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/customers/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Customer Deleted');

            fetchCustomers();
        } catch (err) {
            toast.error('Delete Failed');
            console.error('Failed to delete customer', err.message);
        }
    };

    const filteredLoans = filterStatus === 'all'
        ? loans
        : loans.filter(loan => loan.status === filterStatus);

    useEffect(() => {
        fetchCustomers();
        fetchLoans();
    }, []);

    return (
        <>
            <Navbar />
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                </div>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Customers</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 border">Name</th>
                                    <th className="py-2 px-4 border">NIC</th>
                                    <th className="py-2 px-4 border">Email</th>
                                    <th className="py-2 px-4 border">Monthly Income</th>
                                    <th className="py-2 px-4 border">Credit Score</th>
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
                                            <button
                                                onClick={() => handleDeleteCustomer(cust._id)}
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
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Loan Applications</h2>
                    <div className="flex gap-4 mb-4">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="all">All</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 border">Applicant</th>
                                    <th className="py-2 px-4 border">Loan Amount</th>
                                    <th className="py-2 px-4 border">Score</th>
                                    <th className="py-2 px-4 border">Status</th>
                                    <th className="py-2 px-4 border">Recommendation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLoans.map((loan) => (
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
                </section>
            </div>
        </>
    );
};

export default AdminDashboard;
