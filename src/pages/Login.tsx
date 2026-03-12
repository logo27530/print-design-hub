import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, setAuth, logout } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  if (auth.loggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <TopBanner />
        <Header />
        <div className="container mx-auto px-4 py-16 max-w-md text-center">
          <div className="bg-card rounded-xl shadow-card p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">Welcome back!</h2>
            <p className="text-muted-foreground mb-2">{auth.email}</p>
            {auth.isAdmin && (
              <Button className="mb-4 bg-primary text-primary-foreground w-full" onClick={() => navigate("/admin")}>
                Go to Admin Panel
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                logout();
                toast("Logged out successfully");
                navigate("/");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    // Simple admin check
    const isAdmin = email === "admin@logoprint.in" && password === "admin123";
    setAuth({ loggedIn: true, isAdmin, email });
    toast.success(isAdmin ? "Welcome Admin!" : "Login successful!");
    navigate(isAdmin ? "/admin" : "/");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Header />

      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="bg-card rounded-xl shadow-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground text-2xl font-bold font-display">L</span>
            </div>
            <h1 className="text-2xl font-bold font-display text-foreground">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {isSignup ? "Join LogoPrint today" : "Sign in to your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              {isSignup ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm text-primary hover:underline"
            >
              {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
          </div>

          <div className="mt-4 p-3 bg-secondary rounded-lg text-center">
            <p className="text-xs text-muted-foreground">
              Admin login: admin@logoprint.in / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
