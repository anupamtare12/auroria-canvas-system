import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Modern Villa",
      category: "Residential",
      year: "2024",
      location: "Mumbai",
      description: "A contemporary family home that seamlessly blends indoor and outdoor living."
    },
    {
      id: 2,
      title: "Urban Loft",
      category: "Residential",
      year: "2023",
      location: "Delhi",
      description: "Industrial aesthetics meet modern comfort in this converted warehouse space."
    },
    {
      id: 3,
      title: "Minimalist Office",
      category: "Commercial",
      year: "2024",
      location: "Bangalore",
      description: "A clean, efficient workspace designed to enhance productivity and well-being."
    },
    {
      id: 4,
      title: "Luxury Penthouse",
      category: "Residential",
      year: "2023",
      location: "Goa",
      description: "Coastal living redefined with panoramic views and sophisticated interiors."
    },
    {
      id: 5,
      title: "Boutique Hotel",
      category: "Hospitality",
      year: "2024",
      location: "Udaipur",
      description: "Traditional Rajasthani architecture reimagined for the modern traveler."
    },
    {
      id: 6,
      title: "Family Residence",
      category: "Residential",
      year: "2023",
      location: "Chennai",
      description: "A warm, inviting home that celebrates family life and togetherness."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navigation />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-4xl"
            >
              <h1 className="text-hero font-display mb-8">Projects</h1>
              <p className="text-body text-muted-foreground max-w-3xl">
                Explore our portfolio of thoughtfully designed spaces that reflect our commitment to creating architecture that feels like home. Each project tells a unique story of collaboration, innovation, and attention to detail.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="bg-beige h-80 mb-6 rounded-sm group-hover:scale-105 transition-transform duration-500" />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-subheading group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="text-caption text-muted-foreground">{project.year}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-body text-accent">{project.category}</span>
                      <span className="text-body text-muted-foreground">•</span>
                      <span className="text-body text-muted-foreground">{project.location}</span>
                    </div>
                    
                    <p className="text-body text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-surface">
          <div className="container-luxury text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-heading mb-8">Ready to Start Your Project?</h2>
              <p className="text-body text-muted-foreground mb-12 max-w-2xl mx-auto">
                Let's collaborate to create a space that reflects your vision and enhances your lifestyle.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-foreground text-background px-12 py-4 rounded-sm hover:bg-accent hover:text-foreground transition-colors duration-300"
              >
                Get In Touch
              </motion.button>
            </motion.div>
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

export default Projects;