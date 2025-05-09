import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { logout, role } = useAuth();
    const navigate = useNavigate();

    const goToDashboard = () => {
        if (role === 'admin') {
            navigate('/dashboard/admin');
        } else {
            navigate('/dashboard/customer');
        }
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
            <div className="text-xl font-bold cursor-pointer" onClick={goToDashboard}>
                FundFlow
            </div>
            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
