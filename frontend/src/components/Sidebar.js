/**
  
 * @file Sidebar.jsx
 * @description Sidebar navigation for both admin and customer roles
 * - Displays relevant dashboard routes based on user role
 * - Includes logout functionality
 *
 * @uses useAuth() to determine role and handle logout
 * @routes
 *   - Admin: Dashboard, Customers, Loans
 *   - Customer: Dashboard only
   */

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
    const { logout, role } = useAuth();

    const routes = role === 'admin'
        ? [
            { label: 'Dashboard', href: '/dashboard/admin' },
            { label: 'Customers', href: '/dashboard/admin?tab=customers' },
            { label: 'Loans', href: '/dashboard/admin?tab=loans' },
        ]
        : [
            { label: 'Dashboard', href: '/dashboard/customer' }
        ];

    return (
        <aside className="w-60 h-screen sticky top-0 bg-white/5 backdrop-blur-md border-r border-white/10 flex flex-col justify-between p-4">
            <div>
                <h1 className="text-2xl font-bold mb-8 text-center text-blue-400">FundFlow</h1>
                <nav className="space-y-4">
                    {routes.map(({ label, href }) => (
                        <Link key={href} href={href} className="block px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium shadow hover:shadow-md transition-all">
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
            <button
                onClick={logout}
                className="mt-6 px-4 py-2 w-full bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
                Logout
            </button>
        </aside>
    );
};

export default Sidebar;
