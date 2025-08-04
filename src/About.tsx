import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 tracking-tight">About Us</h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
                We are ANAUR DESIGN, an architecture and interior design studio dedicated to creating spaces that feel like home. Our philosophy centers around the belief that great design emerges from understanding the unique needs, desires, and dreams of each client.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-8 md:px-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">Our Story</h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Founded in 2024, ANAUR DESIGN emerged from a shared vision between architects Anupam and Saurabh, who believed that architecture should be more than just functional spaces – it should be an extension of one's personality and lifestyle.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our approach combines contemporary design principles with timeless aesthetics, creating environments that are both sophisticated and livable. We specialize in residential architecture, luxury interiors, and bespoke furniture design.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-96 rounded-lg shadow-lg">
                  <div className="absolute inset-0 bg-black/5 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 font-light">Story Image</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">Our Philosophy</h2>
              <blockquote className="text-2xl md:text-3xl font-light italic text-gray-600 mb-8 leading-relaxed">
                "Architecture that feels like home"
              </blockquote>
              <p className="text-lg text-gray-600 leading-relaxed">
                This guiding principle shapes every project we undertake. We believe that the best designs are those that enhance daily life, foster connections, and create lasting memories. Each space we create tells a unique story – your story.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-8 md:px-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light text-center mb-16 tracking-tight"
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
                  <div className="relative mx-auto mb-6">
                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-80 w-64 mx-auto rounded-lg shadow-lg">
                      <div className="absolute inset-0 bg-black/5 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 font-light">{member.name}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light mb-2 tracking-tight">{member.name}</h3>
                  <p className="text-lg text-gray-500 mb-4 font-light">{member.role}</p>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-sm mx-auto">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-8 md:px-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light text-center mb-16 tracking-tight"
            >
              Our Values
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "Innovation",
                  description: "Pushing the boundaries of traditional design to create spaces that are both timeless and contemporary."
                },
                {
                  title: "Sustainability",
                  description: "Committed to environmentally conscious design practices that benefit both our clients and the planet."
                },
                {
                  title: "Craftsmanship",
                  description: "Attention to detail and quality in every aspect of our work, from concept to completion."
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <h3 className="text-2xl md:text-3xl font-light mb-4 tracking-tight">{value.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0 tracking-wide">
              © 2024 ANAUR DESIGN. ALL RIGHTS RESERVED.
            </div>
            <div className="text-sm text-gray-500 tracking-wide">
              WEBSITE BY ANAUR STUDIO
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
