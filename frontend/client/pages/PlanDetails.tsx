import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { plansAPI, subscriptionsAPI, Plan } from "@/lib/api";
import { toast } from "sonner";

export default function PlanDetails() {
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        if (!id) return;
        const plans = await plansAPI.getAll();
        const foundPlan = plans.find((p) => p.id === parseInt(id));
        if (foundPlan) {
          setPlan(foundPlan);
        } else {
          toast.error("Plan not found");
          navigate("/plans");
        }
      } catch (error) {
        toast.error("Failed to load plan");
        navigate("/plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id, navigate]);

  const handleSubscribe = async () => {
    if (!plan) return;
    setSubscribing(true);
    try {
      await subscriptionsAPI.subscribe(plan.id);
      setIsSubscribed(true);
      toast.success("Successfully subscribed to plan!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      toast.error("Failed to subscribe to plan");
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="text-slate-600">Loading plan...</div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          onClick={() => navigate("/plans")}
          variant="outline"
          className="mb-8"
        >
          ← Back to Plans
        </Button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {plan.title}
          </h1>

          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-5xl font-bold text-slate-900">
              ${plan.price}
            </span>
            <span className="text-xl text-slate-600">/month</span>
          </div>

          <div className="prose prose-sm max-w-none mb-8">
            <h3 className="text-lg font-semibold text-slate-900">
              Description
            </h3>
            <p className="text-slate-600 whitespace-pre-wrap">
              {plan.description}
            </p>
          </div>

          <div className="mb-8">
            <p className="text-sm text-slate-600">
              Created on {new Date(plan.created_at).toLocaleDateString()}
            </p>
          </div>

          {isSubscribed ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
              ✓ You are now subscribed to this plan!
            </div>
          ) : (
            <Button
              onClick={handleSubscribe}
              disabled={subscribing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
            >
              {subscribing ? "Subscribing..." : "Subscribe Now"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
