import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-light mb-8 text-gray-900">
            About ANAUR
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We are passionate architects and designers who believe that great design 
            has the power to transform lives. Our approach combines innovative thinking 
            with timeless principles to create spaces that are both beautiful and functional.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
