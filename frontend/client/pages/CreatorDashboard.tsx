import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { plansAPI, Plan } from "@/lib/api";
import { isAuthenticated, getUserRole } from "@/lib/auth";
import { toast } from "sonner";

export default function CreatorDashboard() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated() || getUserRole() !== "creator") {
      navigate("/login");
      return;
    }

    fetchPlans();
  }, [navigate]);

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

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price) {
      toast.error("Please fill in all fields");
      return;
    }

    setCreating(true);
    try {
      await plansAPI.create({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
      });

      toast.success("Plan created successfully!");
      setFormData({ title: "", description: "", price: "" });
      setShowForm(false);
      fetchPlans();
    } catch (error) {
      toast.error("Failed to create plan");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Creator Dashboard
          </h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {showForm ? "Cancel" : "Create New Plan"}
          </Button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-12 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Create a New Plan
            </h2>
            <form onSubmit={handleCreatePlan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Plan Title
                </label>
                <Input
                  type="text"
                  placeholder="e.g., 12-Week Fitness Program"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  disabled={creating}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe your plan..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  disabled={creating}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price per Month ($)
                </label>
                <Input
                  type="number"
                  placeholder="29.99"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  disabled={creating}
                />
              </div>

              <Button
                type="submit"
                disabled={creating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {creating ? "Creating..." : "Create Plan"}
              </Button>
            </form>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Plans</h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-slate-600">Loading...</div>
            </div>
          ) : plans.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center border border-slate-200">
              <p className="text-slate-600 text-lg mb-4">
                You haven't created any plans yet
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create Your First Plan
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900">
                      ${plan.price}
                    </span>
                    <span className="text-slate-600">/month</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
