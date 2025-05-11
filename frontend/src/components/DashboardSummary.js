/**
 * ==========================================================
 * @file DashboardSummary.jsx
 * @description Dashboard summary card displaying stats
 * - Shows key metrics based on user role (admin vs customer)
 * - Admins see totals across the system
 * - Customers see their own limited metrics
 * 
 * @prop {string} role - Role of the logged-in user ('admin' or 'customer')
 * ==========================================================
 */

export default function DashboardSummary({ role }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                {
                    title: 'Total Customers',
                    value: role === 'admin' ? '154' : '—',
                    icon: '👥',
                },
                {
                    title: 'Total Loans',
                    value: role === 'admin' ? '327' : '4',
                    icon: '💰',
                },
                {
                    title: 'Approved Loans',
                    value: role === 'admin' ? '241' : '2',
                    icon: ' ',
                },
            ].map((item) => (
                <div
                    key={item.title}
                    className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg text-white flex flex-col justify-between"
                >
                    <div className="text-4xl">{item.icon}</div>
                    <div className="text-sm text-gray-300 mt-2">{item.title}</div>
                    <div className="text-2xl font-bold">{item.value}</div>
                </div>
            ))}
        </div>
    );
}
