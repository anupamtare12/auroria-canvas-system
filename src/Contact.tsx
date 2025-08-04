import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@anaurdesign.com",
      link: "mailto:hello@anaurdesign.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98765 43210",
      link: "tel:+919876543210"
    },
    {
      icon: MapPin,
      label: "Address",
      value: "123 Design Street, Mumbai, India",
      link: "#"
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Mon - Fri: 9AM - 6PM",
      link: "#"
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
              <h1 className="text-hero font-display mb-8">Contact Us</h1>
              <p className="text-body text-muted-foreground max-w-3xl">
                Ready to bring your vision to life? We'd love to hear about your project and discuss how we can create a space that truly feels like home. Get in touch with us today.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-heading mb-8">Send us a message</h2>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
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
                  
                  <div>
                    <label className="block text-body mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-surface border border-border rounded-sm focus:outline-none focus:border-accent transition-colors duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-body mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-surface border border-border rounded-sm focus:outline-none focus:border-accent transition-colors duration-300"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-body mb-2">Project Type</label>
                    <select className="w-full px-4 py-3 bg-surface border border-border rounded-sm focus:outline-none focus:border-accent transition-colors duration-300">
                      <option>Select project type</option>
                      <option>Residential Architecture</option>
                      <option>Interior Design</option>
                      <option>Commercial Space</option>
                      <option>Renovation</option>
                      <option>Consultation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-body mb-2">Message</label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-sm focus:outline-none focus:border-accent transition-colors duration-300"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-foreground text-background py-4 rounded-sm hover:bg-accent hover:text-foreground transition-colors duration-300"
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-heading mb-8">Get in touch</h2>
                  <p className="text-body text-muted-foreground mb-12">
                    Whether you're planning a new home, renovating an existing space, or need design consultation, our team is here to help bring your vision to life.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.link}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="flex items-center space-x-4 group hover:text-accent transition-colors duration-300"
                    >
                      <div className="w-12 h-12 bg-surface flex items-center justify-center rounded-sm group-hover:bg-accent group-hover:text-background transition-colors duration-300">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="text-caption text-muted-foreground">{item.label}</p>
                        <p className="text-body">{item.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Map Placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="bg-beige h-64 rounded-sm"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-surface">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-heading mb-8">Frequently Asked Questions</h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "What is your design process like?",
                  answer: "Our design process begins with understanding your vision, lifestyle, and requirements. We then create detailed concepts, develop design solutions, and work closely with you throughout the implementation phase."
                },
                {
                  question: "How long does a typical project take?",
                  answer: "Project timelines vary depending on scope and complexity. Residential projects typically range from 3-8 months, while commercial projects may take 6-12 months. We'll provide a detailed timeline during our initial consultation."
                },
                {
                  question: "Do you work on projects outside Mumbai?",
                  answer: "Yes, we work on projects across India and select international locations. We're happy to discuss your project regardless of location and will work out the logistics together."
                },
                {
                  question: "What services do you offer?",
                  answer: "We offer comprehensive architectural and interior design services including space planning, 3D visualization, construction documentation, project management, and custom furniture design."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-b border-border pb-6"
                >
                  <h3 className="text-subheading mb-4">{faq.question}</h3>
                  <p className="text-body text-muted-foreground">{faq.answer}</p>
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

export default Contact;