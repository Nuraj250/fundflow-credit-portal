import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Layout from '@/components/Layout';
import CustomerTable from '@/components/CustomerTable';
import LoanTable from '@/components/LoanTable';

export default function AdminDashboard() {
    const { token, role } = useAuth();
    const router = useRouter();
    const [customers, setCustomers] = useState([]);
    const [loans, setLoans] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        if (role !== 'admin') router.push('/');
    }, [role]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [c, l] = await Promise.all([api.get('/customers'), api.get('/loans')]);
                setCustomers(c.data);
                setLoans(l.data);
            } catch {
                toast.error('Error fetching data');
            }
        };
        if (token) fetchData();
    }, [token]);

    const deleteCustomer = async (id) => {
        if (!confirm('Delete customer?')) return;
        await api.delete(`/customers/${id}`);
        toast.success('Customer deleted');
        setCustomers(customers.filter(c => c._id !== id));
    };

    const filteredLoans = filterStatus === 'all'
        ? loans
        : loans.filter((l) => l.status === filterStatus);

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-3">Customers</h2>
                <CustomerTable customers={customers} onDelete={deleteCustomer} />
            </section>

            <section>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-semibold">Loans</h2>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    >
                        <option value="all">All</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <LoanTable loans={filteredLoans} />
            </section>
        </Layout>
    );
}
