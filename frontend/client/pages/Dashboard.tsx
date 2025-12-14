import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { subscriptionsAPI, feedAPI, plansAPI, Plan, FeedItem } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { toast } from "sonner";

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Plan[]>([]);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [subs, feedData, allPlans] = await Promise.all([
          subscriptionsAPI.getAll(),
          feedAPI.get(),
          plansAPI.getAll(),
        ]);

        const planMap = new Map(allPlans.map((p) => [p.id, p]));
        const subscribedPlans = subs
          .map((sub) => planMap.get(sub.plan_id))
          .filter(Boolean) as Plan[];

        setSubscriptions(subscribedPlans);
        setFeed(feedData);
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900">
              My Subscriptions
            </h2>
            <Button
              onClick={() => navigate("/plans")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Browse More Plans
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-slate-600">Loading...</div>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center border border-slate-200">
              <p className="text-slate-600 text-lg mb-4">
                You haven't subscribed to any plans yet
              </p>
              <Button
                onClick={() => navigate("/plans")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Explore Plans
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptions.map((plan) => (
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

        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Your Feed</h2>

          {feed.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center border border-slate-200">
              <p className="text-slate-600 text-lg">
                Follow creators to see their plans in your feed
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feed.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
                >
                  <p className="text-sm text-slate-600 mb-2">
                    by {item.creator.email}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.plan.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {item.plan.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900">
                      ${item.plan.price}
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
