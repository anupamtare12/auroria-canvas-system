import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const About = () => {
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
              <h1 className="text-hero font-display mb-8">About Us</h1>
              <p className="text-body text-muted-foreground max-w-3xl">
                We are ANAUR DESIGN, an architecture and interior design studio dedicated to creating spaces that feel like home. Our philosophy centers around the belief that great design emerges from understanding the unique needs, desires, and dreams of each client.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding bg-surface">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-heading mb-8">Our Story</h2>
                <div className="space-y-6">
                  <p className="text-body text-muted-foreground">
                    Founded in 2024, ANAUR DESIGN emerged from a shared vision between architects Anupam and Saurabh, who believed that architecture should be more than just functional spaces – it should be an extension of one's personality and lifestyle.
                  </p>
                  <p className="text-body text-muted-foreground">
                    Our approach combines contemporary design principles with timeless aesthetics, creating environments that are both sophisticated and livable. We specialize in residential architecture, luxury interiors, and bespoke furniture design.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-beige h-96 rounded-sm"
              />
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="section-padding">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-heading mb-8">Our Philosophy</h2>
              <blockquote className="text-subheading font-display italic text-muted-foreground mb-8">
                "Architecture that feels like home"
              </blockquote>
              <p className="text-body text-muted-foreground">
                This guiding principle shapes every project we undertake. We believe that the best designs are those that enhance daily life, foster connections, and create lasting memories. Each space we create tells a unique story – your story.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding bg-surface">
          <div className="container-luxury">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-heading text-center mb-16"
            >
              Meet the Team
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-16">
              {[
                {
                  name: "Anupam",
                  role: "Principal Architect",
                  description: "With over a decade of experience in residential and commercial architecture, Anupam brings a unique perspective that blends functionality with artistic vision."
                },
                {
                  name: "Saurabh",
                  role: "Design Director",
                  description: "Saurabh specializes in interior design and spatial planning, with a keen eye for detail and a passion for creating harmonious living environments."
                }
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-beige h-80 w-64 mx-auto mb-6 rounded-sm" />
                  <h3 className="text-subheading mb-2">{member.name}</h3>
                  <p className="text-body text-accent mb-4">{member.role}</p>
                  <p className="text-body text-muted-foreground">{member.description}</p>
                </motion.div>
              ))}
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

export default About;