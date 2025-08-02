import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

const Navigation = ({ isDark, onThemeToggle }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Journal', href: '#journal' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md border-b border-border/50' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 3 }}
      >
        <div className="container-luxury flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-neue font-light tracking-wider relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            ANAUR
            <div className="absolute inset-0 text-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm">
              ANAUR
            </div>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-sm font-light tracking-wide hover:text-accent transition-colors duration-300 relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 3.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <motion.button
              onClick={onThemeToggle}
              className="p-2 rounded-full hover:bg-muted transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-muted transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Content */}
            <div className="relative flex flex-col items-center justify-center h-full">
              <div className="space-y-8">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block text-3xl font-light tracking-wide hover:text-accent transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;