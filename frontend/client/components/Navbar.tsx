import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { isAuthenticated, getUserRole, clearAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function Navbar() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const role = getUserRole();

  const handleLogout = () => {
    clearAuth();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            FitPlanHub
          </Link>

          <div className="flex items-center gap-4">
            {authenticated ? (
              <>
                {role === "user" && (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-slate-700 hover:text-blue-600 font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/plans"
                      className="text-slate-700 hover:text-blue-600 font-medium"
                    >
                      Browse Plans
                    </Link>
                  </>
                )}
                {role === "creator" && (
                  <>
                    <Link
                      to="/creator-dashboard"
                      className="text-slate-700 hover:text-blue-600 font-medium"
                    >
                      Creator Dashboard
                    </Link>
                    <Link
                      to="/plans"
                      className="text-slate-700 hover:text-blue-600 font-medium"
                    >
                      Browse Plans
                    </Link>
                  </>
                )}
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-slate-300"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-slate-300">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
