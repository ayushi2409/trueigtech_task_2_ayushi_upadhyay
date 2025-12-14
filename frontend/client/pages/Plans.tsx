import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { plansAPI, Plan } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { toast } from "sonner";

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const fetchPlans = async () => {
      try {
        const data = await plansAPI.getAll();
        setPlans(data);
      } catch (error) {
        toast.error("Failed to load plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [navigate]);

  const handleSubscribe = (planId: number) => {
    navigate(`/plan/${planId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Available Plans
        </h1>
        <p className="text-slate-600 mb-12">
          Browse and subscribe to fitness plans from top creators
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-slate-600">Loading plans...</div>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No plans available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {plan.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-slate-900">
                    ${plan.price}
                  </span>
                  <span className="text-slate-600">/month</span>
                </div>
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
