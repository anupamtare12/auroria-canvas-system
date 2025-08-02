import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Auto-hide preloader after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground dark-transition overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Preloader */}
      {isLoading && <Preloader />}

      {/* Main Content */}
      {!isLoading && (
        <>
          <Navigation />
          <main>
            <Hero />
            <About />
            
            {/* Placeholder sections for future development */}
            <section id="projects" className="section-padding">
              <div className="container-luxury text-center">
                <h2 className="text-heading mb-8">Projects</h2>
                <p className="text-body text-muted-foreground">Coming soon...</p>
              </div>
            </section>

            <section id="services" className="section-padding bg-surface">
              <div className="container-luxury text-center">
                <h2 className="text-heading mb-8">Services</h2>
                <p className="text-body text-muted-foreground">Coming soon...</p>
              </div>
            </section>

            <section id="journal" className="section-padding">
              <div className="container-luxury text-center">
                <h2 className="text-heading mb-8">Journal</h2>
                <p className="text-body text-muted-foreground">Coming soon...</p>
              </div>
            </section>

            <section id="contact" className="section-padding bg-surface">
              <div className="container-luxury text-center">
                <h2 className="text-heading mb-8">Contact</h2>
                <p className="text-body text-muted-foreground">Coming soon...</p>
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
        </>
      )}
    </div>
  );
};

export default Index;
