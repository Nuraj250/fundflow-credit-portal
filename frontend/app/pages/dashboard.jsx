import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const [cRes, lRes] = await Promise.all([
        api.get('/customers'),
        api.get('/loans')
      ]);
      setCustomers(cRes.data);
      setLoans(lRes.data);
    } catch (err) {
      if (err.response?.status === 401) router.push('/login');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    await api.delete(`/customers/${id}`);
    fetchData(); // refresh
  };

  const handleUpdate = async () => {
    await api.put(`/customers/${editingCustomer._id}`, editingCustomer);
    setEditingCustomer(null);
    fetchData();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <h2 className="text-lg font-semibold mb-2">Customers</h2>
      <ul className="space-y-2 mb-8">
        {customers.map((c) => (
          <li key={c._id} className="bg-gray-100 p-3 rounded flex justify-between items-center">
            {editingCustomer && editingCustomer._id === c._id ? (
              <div className="flex flex-col space-y-2 w-full">
                <input
                  type="text"
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                  className="border p-1"
                />
                <input
                  type="email"
                  value={editingCustomer.email}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                  className="border p-1"
                />
                <input
                  type="text"
                  value={editingCustomer.NIC}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, NIC: e.target.value })}
                  className="border p-1"
                />
                <input
                  type="number"
                  value={editingCustomer.monthlyIncome}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, monthlyIncome: e.target.value })}
                  className="border p-1"
                />
                <button onClick={handleUpdate} className="bg-green-600 text-white py-1 mt-2 rounded">
                  Save
                </button>
                <button onClick={() => setEditingCustomer(null)} className="text-red-600">
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span>{c.name} - {c.email} - Credit Score: {c.creditScore}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingCustomer(c)}
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mb-2">Loan Applications</h2>
      <ul className="space-y-2">
        {loans.map((l) => (
          <li key={l._id} className="bg-gray-50 p-3 rounded">
            Amount: {l.loanAmount} | Status: {l.status} | Score: {l.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
