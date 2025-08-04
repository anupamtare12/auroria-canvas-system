import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { Link } from "wouter";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navigation />
      
      <main className="pt-24">
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
              {/* Left Side - Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md mx-auto w-full"
              >
                <div className="text-center mb-12">
                  <h1 className="text-heading font-display mb-4">
                    {isSignUp ? "Create Account" : "Welcome Back"}
                  </h1>
                  <p className="text-body text-muted-foreground">
                    {isSignUp 
                      ? "Join ANAUR DESIGN to access exclusive content and services"
                      : "Sign in to your ANAUR DESIGN account"
                    }
                  </p>
                </div>

                <form className="space-y-6">
                  {isSignUp && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-body mb-2">First Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-sm focus:outline-none focus:border-accent transition-colors duration-300"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-body mb-2">Last Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-sm focus:outline-none focus:border-accent transition-colors duration-300"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-body mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-surface border border-border rounded-sm focus:outline-none focus:border-accent transition-colors duration-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-body mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-3 bg-surface border border-border rounded-sm focus:outline-none focus:border-accent transition-colors duration-300 pr-12"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {isSignUp && (
                    <div>
                      <label className="block text-body mb-2">Confirm Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-surface border border-border rounded-sm focus:outline-none focus:border-accent transition-colors duration-300"
                        placeholder="••••••••"
                      />
                    </div>
                  )}

                  {!isSignUp && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-body text-muted-foreground">Remember me</span>
                      </label>
                      <Link to="#" className="text-body text-accent hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-foreground text-background py-4 rounded-sm hover:bg-accent hover:text-foreground transition-colors duration-300"
                  >
                    {isSignUp ? "Create Account" : "Sign In"}
                  </motion.button>

                  <div className="text-center">
                    <p className="text-body text-muted-foreground">
                      {isSignUp ? "Already have an account?" : "Don't have an account?"}
                      <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-accent hover:underline ml-2"
                      >
                        {isSignUp ? "Sign In" : "Sign Up"}
                      </button>
                    </p>
                  </div>
                </form>

                {/* Social Login */}
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center px-4 py-3 border border-border rounded-sm hover:bg-surface transition-colors duration-300">
                      <span className="text-body">Google</span>
                    </button>
                    <button className="flex items-center justify-center px-4 py-3 border border-border rounded-sm hover:bg-surface transition-colors duration-300">
                      <span className="text-body">LinkedIn</span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Image/Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="bg-beige h-[600px] rounded-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-subheading mb-4">Join Our Community</h3>
                    <p className="text-body opacity-90">
                      Get exclusive access to design insights, project updates, and early access to our latest collections.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-caption text-muted-foreground mb-4 md:mb-0">
              © 2024 ANAUR DESIGN. ALL RIGHTS RESERVED.
            </div>
            <div className="text-caption text-muted-foreground">
              WEBSITE BY ANAUR STUDIO
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;