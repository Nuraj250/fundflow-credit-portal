/**
 
 * @file AdminDashboard.jsx
 * @description Admin panel UI for managing customers and loans in FundFlow portal
 *
 * Features:
 * - Tab-based rendering for Overview, Customers, and Loans
 * - Admin can:
 *    - Create, edit, delete customers
 *    - Create, edit, delete loan records
 *    - View basic dashboard summaries
 *
 * Dependencies:
 * - Uses context from AuthContext to validate role
 * - Uses API wrapper for secure backend communication
 * - Uses Tailwind CSS for styling
 
 */
import LoanTable from '@/components/LoanTable';
import LoanFormModal from '@/components/LoanFormModal';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout'; 
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import CustomerTable from '@/components/CustomerTable';
import CustomerFormModal from '@/components/CustomerFormModal';
import DashboardSummary from '@/components/DashboardSummary';
import api from '@/lib/api';

export default function AdminDashboard() {
    const { token, role } = useAuth();
    const router = useRouter();
    const { tab = 'overview' } = router.query;
    const [customers, setCustomers] = useState([]); //   Add this
    const [loans, setLoans] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [loanModalOpen, setLoanModalOpen] = useState(false);
    const [editingLoan, setEditingLoan] = useState(null);

    const fetchCustomers = async () => {
        const res = await api.get('/customers');
        setCustomers(res.data);
    };

    useEffect(() => {
        if (token) {
            fetchCustomers();
        }
    }, [token]);
    const fetchLoans = async () => {
        try {
            const res = await api.get('/loans');
            setLoans(res.data);
        } catch {
            toast.error('Failed to fetch loans');
        }
    };

    useEffect(() => {
        if (token) fetchLoans();
    }, [token]);

    const deleteLoan = async (id) => {
        if (!confirm('Delete this loan?')) return;
        try {
            await api.delete(`/loans/${id}`);
            toast.success('Loan deleted');
            fetchLoans();
        } catch {
            toast.error('Delete failed');
        }
    };

    const handleLoanCreate = async (data) => {
        try {
            await api.post('/loans', data);
            toast.success('Loan created');
            fetchLoans();
            setLoanModalOpen(false);
        } catch {
            toast.error('Create failed');
        }
    };

    const handleLoanUpdate = async (data) => {
        try {
            await api.put(`/loans/${editingLoan._id}`, data);
            toast.success('Loan updated');
            fetchLoans();
            setEditingLoan(null);
            setLoanModalOpen(false);
        } catch {
            toast.error('Update failed');
        }
    };

    const openLoanCreate = () => {
        setEditingLoan(null);
        setLoanModalOpen(true);
    };

    const openLoanEdit = (loan) => {
        setEditingLoan(loan);
        setLoanModalOpen(true);
    };
    const openCreate = () => {
        setEditingCustomer(null);
        setModalOpen(true);
    };

    const openEdit = (customer) => {
        setEditingCustomer(customer);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this customer?')) return;
        try {
            await api.delete(`/customers/${id}`);
            toast.success('Deleted successfully');
            fetchCustomers(); // reload the list
        } catch {
            toast.error('Delete failed');
        }
    };

    const handleCreate = async (data) => {
        try {
            await api.post('/customers', data);
            toast.success('Customer created');
            fetchCustomers();
            setModalOpen(false);
        } catch {
            toast.error('Create failed');
        }
    };

    return (
        <Layout>
            {tab === 'overview' && (
                <div>
                    <h1 className="text-3xl font-bold mb-4">Admin Overview</h1>
                    <DashboardSummary role="admin" />
                </div>
            )}

            {tab === 'customers' && (
                <>
                    <div className="flex items-center justify-between mb-4 mt-6">
                        <h1 className="text-3xl font-bold">Customers</h1>
                        <button onClick={openCreate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" >
                            + Add Customer
                        </button>
                    </div>
                    <CustomerTable customers={customers} onEdit={openEdit} onDelete={handleDelete} />
                    <CustomerFormModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onSubmit={editingCustomer ? handleUpdate : handleCreate}
                        initialData={editingCustomer}
                    />
                </>
            )}

            {tab === 'loans' && (
                <>
                    <div className="flex items-center justify-between mb-4 mt-6">
                        <h1 className="text-3xl font-bold">Loans</h1>
                        <button onClick={openLoanCreate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            + Add Loan
                        </button>
                    </div>
                    <LoanTable loans={loans} onEdit={openLoanEdit} onDelete={deleteLoan} />
                    <LoanFormModal
                        isOpen={loanModalOpen}
                        onClose={() => setLoanModalOpen(false)}
                        onSubmit={editingLoan ? handleLoanUpdate : handleLoanCreate}
                        initialData={editingLoan}
                        customers={customers}
                    />
                </>
            )}
        </Layout>

    );
}
