import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import LoanFormModal from '@/components/LoanFormModal';
import LoanTable from '@/components/LoanTable';
import DashboardSummary from '@/components/DashboardSummary';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export default function CustomerDashboard() {
    const { token, role, id } = useAuth();
    const router = useRouter();
    const [loans, setLoans] = useState([]);
    const [loanModalOpen, setLoanModalOpen] = useState(false);

    useEffect(() => {
        if (role !== 'customer') router.push('/');
    }, [role]);

    const fetchLoans = async () => {
        const res = await api.get('/loans');
        setLoans(res.data.filter(l => l.customerId));
    };

    useEffect(() => {
        if (token) fetchLoans();
    }, [token]);

    const handleSubmit = async (formData) => {
        try {
            const payload = { ...formData, customerId: id };
            console.log('🧾 Submitting loan from dashboard:', payload);
            await api.post('/loans', payload);
            toast.success('Loan applied successfully');
            fetchLoans();
            setLoanModalOpen(false);
        } catch (err) {
            console.error('Loan request failed:', err.response?.data || err.message);
            toast.error('Loan request failed');
        }
    };

    return (
        <>
            <Navbar onAddLoan={() => setLoanModalOpen(true)} />
            <Layout>
                <h1 className="text-3xl font-bold mb-6">Welcome, Customer 👋</h1>
                <DashboardSummary role="customer" />
                <section className="mt-10">
                    <h2 className="text-xl font-semibold mb-3">Your Loans</h2>
                    <LoanTable loans={loans} />
                </section>
            </Layout>

            <LoanFormModal
                isOpen={loanModalOpen}
                onClose={() => setLoanModalOpen(false)}
                onSubmit={handleSubmit}
                customerId={id}
                customers={[]} // optional
                role="customer"
            />
        </>
    );
}
