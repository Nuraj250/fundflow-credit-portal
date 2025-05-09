import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const CustomerDashboard = () => {
    const { token, logout } = useAuth();
    const [loanData, setLoanData] = useState({
        loanAmount: "",
        durationMonths: "",
        purpose: "",
        monthlyIncome: "",
        existingLoans: ""
    });
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const fetchLoans = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/loans`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLoans(res.data.filter(loan => loan.customerId));  // Ensure loan has customer linked
        } catch (err) {
            console.error('Failed to fetch loans', err.message);
        }
    };

    const handleChange = (e) => {
        setLoanData({ ...loanData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/loans`, loanData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage(`Loan Status: ${res.data.status} | Recommendation: ${res.data.recommendation}`);
            fetchLoans(); // Refresh loan history
            setLoanData({
                loanAmount: "",
                durationMonths: "",
                purpose: "",
                monthlyIncome: "",
                existingLoans: ""
            });
        } catch (err) {
            console.error('Failed to apply loan', err.message);
            setMessage("Loan application failed.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    return (
        <>
        <Navbar />
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Customer Dashboard</h1>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Apply for a New Loan</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="number"
                        name="loanAmount"
                        placeholder="Loan Amount"
                        value={loanData.loanAmount}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="durationMonths"
                        placeholder="Duration (Months)"
                        value={loanData.durationMonths}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="purpose"
                        placeholder="Purpose"
                        value={loanData.purpose}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="monthlyIncome"
                        placeholder="Monthly Income"
                        value={loanData.monthlyIncome}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="existingLoans"
                        placeholder="Existing Loans"
                        value={loanData.existingLoans}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        {loading ? 'Submitting...' : 'Apply Loan'}
                    </button>
                </form>
                {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Loan History</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border">Loan Amount</th>
                                <th className="py-2 px-4 border">Duration</th>
                                <th className="py-2 px-4 border">Purpose</th>
                                <th className="py-2 px-4 border">Score</th>
                                <th className="py-2 px-4 border">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan._id} className="text-center">
                                    <td className="py-2 px-4 border">{loan.loanAmount}</td>
                                    <td className="py-2 px-4 border">{loan.durationMonths} months</td>
                                    <td className="py-2 px-4 border">{loan.purpose}</td>
                                    <td className="py-2 px-4 border">{loan.score}</td>
                                    <td className="py-2 px-4 border">{loan.status}</td>
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

export default CustomerDashboard;
