import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";
import CustomerTable from "../components/CustomerTable";
import LoanTable from "../components/LoanTable";

const paginate = (array, pageSize, pageNum) =>
    array.slice((pageNum - 1) * pageSize, pageNum * pageSize);

const AdminDashboard = () => {
    const { token } = useAuth();
    const [customers, setCustomers] = useState([]);
    const [loans, setLoans] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editData, setEditData] = useState({ name: "", email: "", monthlyIncome: "" });
    const [page, setPage] = useState(1);

    const fetchCustomers = async () => {
        try {
            const res = await api.get("/customers");
            setCustomers(res.data);
        } catch (err) {
            toast.error("Failed to fetch customers");
        }
    };

    const fetchLoans = async () => {
        try {
            const res = await api.get("/loans");
            setLoans(res.data);
        } catch (err) {
            toast.error("Failed to fetch loans");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this customer?")) return;
        try {
            await api.delete(`/customers/${id}`);
            toast.success("Customer deleted");
            fetchCustomers();
        } catch {
            toast.error("Delete failed");
        }
    };

    const openEditModal = (cust) => {
        setEditingCustomer(cust);
        setEditData({
            name: cust.name,
            email: cust.email,
            monthlyIncome: cust.monthlyIncome,
        });
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async () => {
        try {
            await api.put(`/customers/${editingCustomer._id}`, editData);
            toast.success("Customer updated");
            setEditingCustomer(null);
            fetchCustomers();
        } catch {
            toast.error("Update failed");
        }
    };

    useEffect(() => {
        fetchCustomers();
        fetchLoans();
    }, []);

    const filteredLoans = filterStatus === "all"
        ? loans
        : loans.filter((l) => l.status === filterStatus);
    const pagedCustomers = paginate(customers, 5, page);
    const pagedLoans = paginate(filteredLoans, 5, page);

    return (
        <>
            <Navbar />
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

                <section className="mb-12">
                    <h2 className="text-xl font-semibold mb-4">Customers</h2>
                    <CustomerTable
                        customers={pagedCustomers}
                        onDelete={handleDelete}
                        onEdit={openEditModal}
                    />
                </section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Loans</h2>
                        <select
                            className="border px-2 py-1 rounded"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <LoanTable loans={pagedLoans} />
                </section>

                <div className="flex justify-center mt-6 gap-4">
                    <button onClick={() => setPage(Math.max(1, page - 1))} className="bg-gray-300 px-3 py-1 rounded">Previous</button>
                    <button onClick={() => setPage(page + 1)} className="bg-gray-300 px-3 py-1 rounded">Next</button>
                </div>
            </div>

            {/* Edit Modal */}
            {editingCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow w-96">
                        <h3 className="text-xl font-bold mb-4">Edit Customer</h3>
                        <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleEditChange}
                            className="w-full mb-3 p-2 border rounded"
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={editData.email}
                            onChange={handleEditChange}
                            className="w-full mb-3 p-2 border rounded"
                            placeholder="Email"
                        />
                        <input
                            type="number"
                            name="monthlyIncome"
                            value={editData.monthlyIncome}
                            onChange={handleEditChange}
                            className="w-full mb-4 p-2 border rounded"
                            placeholder="Income"
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={handleEditSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
                            <button onClick={() => setEditingCustomer(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminDashboard;
