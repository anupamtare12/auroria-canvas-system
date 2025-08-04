import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const Shop = () => {
  const products = [
    {
      id: 1,
      name: "Minimalist Table Lamp",
      category: "Lighting",
      price: "₹15,000",
      description: "Handcrafted brass lamp with warm LED lighting"
    },
    {
      id: 2,
      name: "Modern Dining Chair",
      category: "Furniture",
      price: "₹25,000",
      description: "Ergonomic design with premium leather upholstery"
    },
    {
      id: 3,
      name: "Geometric Wall Art",
      category: "Decor",
      price: "₹8,000",
      description: "Abstract metal sculpture for contemporary spaces"
    },
    {
      id: 4,
      name: "Oak Coffee Table",
      category: "Furniture",
      price: "₹45,000",
      description: "Solid wood table with clean lines and natural finish"
    },
    {
      id: 5,
      name: "Ceramic Vase Set",
      category: "Decor",
      price: "₹12,000",
      description: "Handmade ceramic vases in neutral tones"
    },
    {
      id: 6,
      name: "Floor Standing Mirror",
      category: "Decor",
      price: "₹18,000",
      description: "Full-length mirror with brass frame details"
    }
  ];

  const categories = ["All", "Furniture", "Lighting", "Decor"];

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
              <h1 className="text-hero font-display mb-8">Shop</h1>
              <p className="text-body text-muted-foreground max-w-3xl">
                Discover our curated collection of furniture, lighting, and decor pieces. Each item is carefully selected or designed to complement modern living spaces with timeless appeal.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="pb-16">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center space-x-8 mb-16"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  className="text-body text-muted-foreground hover:text-foreground transition-colors duration-300 border-b-2 border-transparent hover:border-accent pb-2"
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
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
                        {product.name}
                      </h3>
                      <span className="text-body font-medium">{product.price}</span>
                    </div>
                    
                    <p className="text-body text-accent">{product.category}</p>
                    <p className="text-body text-muted-foreground">{product.description}</p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 bg-foreground text-background px-8 py-2 rounded-sm hover:bg-accent hover:text-foreground transition-colors duration-300 opacity-0 group-hover:opacity-100"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="section-padding bg-surface">
          <div className="container-luxury text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-heading mb-8">Stay Updated</h2>
              <p className="text-body text-muted-foreground mb-8">
                Subscribe to our newsletter for new product launches and design inspiration.
              </p>
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-l-sm focus:outline-none focus:border-accent"
                />
                <button className="bg-foreground text-background px-8 py-3 rounded-r-sm hover:bg-accent hover:text-foreground transition-colors duration-300">
                  Subscribe
                </button>
              </div>
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

export default Shop;