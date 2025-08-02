import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Journal", path: "/journal" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const textColor = isHomePage && !scrolled ? 'text-white' : 'text-foreground';
  const textColorHover = isHomePage && !scrolled ? 'text-white/90 hover:text-white' : 'text-muted-foreground hover:text-foreground';

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl",
        isHomePage && !scrolled
          ? "bg-white/5 py-6"
          : "bg-background/90 border-b border-border/10 py-3 shadow-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* Logo - with scale on scroll */}
          <motion.div
            animate={{ scale: scrolled ? 0.9 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className={cn(
                "text-2xl font-bold font-neue transition-all duration-500 hover:tracking-wider hover:text-accent",
                textColor
              )}
            >
              Anaur design
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                className="relative group"
              >
                <Link
                  to={item.path}
                  className={cn(
                    "text-lg font-bold relative transition-all duration-300 tracking-wide after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-current hover:after:w-full after:transition-all after:duration-300",
                    location.pathname === item.path ? textColor : textColorHover
                  )}
                >
                  {item.name}
                </Link>
                {location.pathname === item.path && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent"></span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn("md:hidden p-2 transition-all duration-500", textColor)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="md:hidden mt-4 pb-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-6 pt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-bold transition-all duration-500",
                      location.pathname === item.path
                        ? textColor
                        : textColorHover
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;