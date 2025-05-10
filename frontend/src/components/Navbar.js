import { useAuth } from '@/context/AuthContext';

export default function Navbar({ onAddLoan }) {
    const { logout, role } = useAuth();
    const dashboardLink = role === 'admin' ? '/dashboard/admin' : '/dashboard/customer';

    return (
        <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
            <a href={dashboardLink} className="font-bold text-xl">FundFlow</a>
            <div className="flex gap-4">
                {role === 'customer' && (
                    <button
                        onClick={onAddLoan}
                        className="bg-white/20 border border-white/30 px-4 py-1 rounded hover:bg-white/30"
                    >
                        ➕ Add Loan
                    </button>
                )}
                <button onClick={logout} className="bg-red-600 px-4 py-1 rounded hover:bg-red-700">
                    Logout
                </button>
            </div>
        </nav>
    );
}
