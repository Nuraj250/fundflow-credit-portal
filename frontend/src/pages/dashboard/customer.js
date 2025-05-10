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
    const { token, role } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loans, setLoans] = useState([]);
    const [loanModalOpen, setLoanModalOpen] = useState(false);
    const [loanData, setLoanData] = useState({
        loanAmount: '', durationMonths: '', purpose: '', monthlyIncome: '', existingLoans: ''
    });
    const closeModal = () => setIsOpen(false);
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

    const handleChange = (e) => setLoanData({ ...loanData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/loans', loanData);
            toast.success('Loan applied successfully');
            fetchLoans();
            setLoanData({ loanAmount: '', durationMonths: '', purpose: '', monthlyIncome: '', existingLoans: '' });
            setLoanModalOpen(false);
        } catch {
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
                isOpen={isOpen}
                onClose={closeModal}
                onSubmit={(formData) => {
                    const payload = { ...formData };
                    delete payload.customerId;
                    createLoanAsCustomer(payload);
                }}
                customers={[]}
                role="customer"
                style={{ position: 'absolute', top: '150%' }}
            />
        </>
    );
}
