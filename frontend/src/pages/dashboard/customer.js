import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Layout from '@/components/Layout';
import LoanForm from '@/components/LoanForm';
import LoanTable from '@/components/LoanTable';

export default function CustomerDashboard() {
  const { token, role } = useAuth();
  const router = useRouter();
  const [loans, setLoans] = useState([]);
  const [loanData, setLoanData] = useState({
    loanAmount: '',
    durationMonths: '',
    purpose: '',
    monthlyIncome: '',
    existingLoans: '',
  });

  useEffect(() => {
    if (role !== 'customer') router.push('/');
  }, [role]);

  useEffect(() => {
    const fetchLoans = async () => {
      const res = await api.get('/loans');
      setLoans(res.data.filter(l => l.customerId));
    };
    if (token) fetchLoans();
  }, [token]);

  const handleChange = (e) => {
    setLoanData({ ...loanData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/loans', loanData);
      toast.success(`Loan ${res.data.status}`);
      setLoanData({
        loanAmount: '',
        durationMonths: '',
        purpose: '',
        monthlyIncome: '',
        existingLoans: '',
      });
      const updated = await api.get('/loans');
      setLoans(updated.data.filter(l => l.customerId));
    } catch {
      toast.error('Loan application failed');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Apply for a Loan</h2>
        <LoanForm loanData={loanData} onChange={handleChange} onSubmit={handleSubmit} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Your Loans</h2>
        <LoanTable loans={loans} />
      </section>
    </Layout>
  );
}
