import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Connect with Fitness Creators
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Subscribe to personalized fitness plans from top creators or share
            your expertise by creating your own plans. Join FitPlanHub today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                className="border-slate-300 px-8 py-6 text-lg"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">For Users</h3>
            <p className="text-slate-600">
              Discover and subscribe to fitness plans from creators you love.
              Personalized content tailored to your goals.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              For Creators
            </h3>
            <p className="text-slate-600">
              Share your fitness expertise and build a community. Create,
              manage, and monetize your plans.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Build Community
            </h3>
            <p className="text-slate-600">
              Follow creators, discover new plans, and grow your fitness journey
              with a supportive community.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-white rounded-lg shadow-md border border-slate-200 p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to start your fitness journey?
          </h2>
          <p className="text-slate-600 mb-8 text-lg">
            Join thousands of users and creators on FitPlanHub
          </p>
          <Link to="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              Sign Up Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
