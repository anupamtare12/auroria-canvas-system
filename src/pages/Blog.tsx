import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Minimalist Living",
      category: "Design Philosophy",
      date: "December 15, 2024",
      readTime: "5 min read",
      excerpt: "Exploring how minimalism creates more meaningful spaces by focusing on what truly matters in our daily lives.",
      featured: true
    },
    {
      id: 2,
      title: "Sustainable Materials in Modern Architecture",
      category: "Sustainability",
      date: "December 10, 2024",
      readTime: "7 min read",
      excerpt: "How choosing eco-friendly materials can create beautiful spaces while protecting our environment for future generations."
    },
    {
      id: 3,
      title: "Creating Harmony Between Indoor and Outdoor Spaces",
      category: "Design Tips",
      date: "December 5, 2024",
      readTime: "6 min read",
      excerpt: "Design strategies to seamlessly blend interior and exterior environments for a more connected living experience."
    },
    {
      id: 4,
      title: "The Psychology of Color in Interior Design",
      category: "Psychology",
      date: "November 28, 2024",
      readTime: "8 min read",
      excerpt: "Understanding how different colors affect mood and behavior to create spaces that enhance well-being."
    },
    {
      id: 5,
      title: "Lighting Design: Setting the Perfect Mood",
      category: "Lighting",
      date: "November 20, 2024",
      readTime: "5 min read",
      excerpt: "The importance of layered lighting and how it transforms the atmosphere of any space throughout the day."
    },
    {
      id: 6,
      title: "Small Spaces, Big Impact",
      category: "Small Spaces",
      date: "November 15, 2024",
      readTime: "6 min read",
      excerpt: "Creative solutions for maximizing functionality and style in compact living environments."
    }
  ];

  const categories = ["All", "Design Philosophy", "Sustainability", "Design Tips", "Psychology", "Lighting"];

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
              <h1 className="text-hero font-display mb-8">Blog</h1>
              <p className="text-body text-muted-foreground max-w-3xl">
                Insights, inspiration, and expert perspectives on architecture, interior design, and creating spaces that enhance everyday life. Join us as we explore the art and science of thoughtful design.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="pb-16">
          <div className="container-luxury">
            {blogPosts.filter(post => post.featured).map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid lg:grid-cols-2 gap-16 items-center group cursor-pointer"
              >
                <div className="bg-beige h-96 rounded-sm group-hover:scale-105 transition-transform duration-500" />
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-caption text-accent">FEATURED</span>
                    <span className="text-caption text-muted-foreground">•</span>
                    <span className="text-caption text-muted-foreground">{post.category}</span>
                  </div>
                  
                  <h2 className="text-heading group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <p className="text-body text-muted-foreground">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-caption text-muted-foreground">{post.date}</span>
                    <span className="text-caption text-muted-foreground">•</span>
                    <span className="text-caption text-muted-foreground">{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Filter Categories */}
        <section className="pb-16">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-8 mb-16"
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

        {/* Blog Posts Grid */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => !post.featured).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="bg-beige h-64 mb-6 rounded-sm group-hover:scale-105 transition-transform duration-500" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-caption text-accent">{post.category}</span>
                      <span className="text-caption text-muted-foreground">•</span>
                      <span className="text-caption text-muted-foreground">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-subheading group-hover:text-accent transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-body text-muted-foreground">
                      {post.excerpt}
                    </p>
                    
                    <span className="text-caption text-muted-foreground">{post.date}</span>
                  </div>
                </motion.article>
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
              <h2 className="text-heading mb-8">Never Miss an Update</h2>
              <p className="text-body text-muted-foreground mb-8">
                Subscribe to our newsletter for the latest design insights and project updates.
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

export default Blog;