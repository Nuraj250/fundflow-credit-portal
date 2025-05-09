import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";
import LoanForm from "../components/LoanForm";
import LoanTable from "../components/LoanTable";

const CustomerDashboard = () => {
    const { token } = useAuth();
    const [loanData, setLoanData] = useState({
        loanAmount: "", durationMonths: "", purpose: "",
        monthlyIncome: "", existingLoans: ""
    });
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLoans = async () => {
        try {
            const res = await api.get("/loans");
            const customerLoans = res.data.filter(l => l.customerId);
            setLoans(customerLoans);
        } catch {
            toast.error("Could not fetch loan history");
        }
    };

    const handleChange = (e) => {
        setLoanData({ ...loanData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            loanData.loanAmount <= 0 || loanData.durationMonths <= 0 ||
            loanData.monthlyIncome <= 0 || loanData.existingLoans < 0 || !loanData.purpose.trim()
        ) {
            toast.error("Please fill valid values");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post("/loans", loanData);
            toast.success(`Loan ${res.data.status}: ${res.data.recommendation}`);
            setLoanData({ loanAmount: "", durationMonths: "", purpose: "", monthlyIncome: "", existingLoans: "" });
            fetchLoans();
        } catch {
            toast.error("Loan application failed");
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
                <h1 className="text-2xl font-bold mb-6">Customer Dashboard</h1>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold mb-3">Apply for Loan</h2>
                    <LoanForm loanData={loanData} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Loan History</h2>
                    <LoanTable loans={loans} />
                </section>
            </div>
        </>
    );
};

export default CustomerDashboard;
