/**
 * ==========================================================
 * @file Layout.jsx
 * @description App-wide layout component with sidebar
 * - Wraps all pages with a consistent layout
 * - Includes a glassmorphic sidebar and main content area
 * - Uses TailwindCSS for modern styling
 * 
 * @component
 * @param {ReactNode} children - Main page content rendered inside layout
 * ==========================================================
 */

import Sidebar from './Sidebar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex bg-gradient-to-br from-black via-[#0f172a] to-gray-900 text-white">
            <Sidebar />
            <main className="flex-1 p-6 overflow-auto">
                <div className="backdrop-blur-lg bg-white/5 p-6 rounded-2xl shadow-xl border border-white/10">
                    {children}
                </div>
            </main>
        </div>
    );
}
