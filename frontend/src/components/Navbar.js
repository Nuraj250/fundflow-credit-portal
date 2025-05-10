import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { logout, role } = useAuth();

    const dashboardLink =
        role === 'admin' ? '/dashboard/admin' : '/dashboard/customer';

    return (
        <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
            <a href={dashboardLink} className="font-bold text-xl">
                FundFlow
            </a>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                Logout
            </button>
        </nav>
    );
}
