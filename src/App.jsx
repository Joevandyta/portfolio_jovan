import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
  Send,
  Menu,
  X,
  CheckCircle2,
  Loader2,
  ArrowUp,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import PhotoStack from "./components/PhotoStack";
import "./App.css";

// --- Assets ---
import jovanCasual from "./assets/jovan_casual.png";
import jovanFormal from "./assets/jovan_formal.jpg";
import { DATA } from "./lib/constants";
// --- Utility ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-bg-dark/80 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-brand-primary tracking-tighter"
        >
          {DATA.nickname}.
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-gray-400 hover:text-brand-primary transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-brand-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-card mt-4 rounded-xl border border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-4 text-gray-400 hover:text-brand-primary hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-12">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold mb-4"
    >
      <span className="text-brand-primary">/</span> {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// --- Contact Form State ---
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("loading");
    // Simulate async send (ganti dengan API call nyata jika ada)
    await new Promise((res) => setTimeout(res, 1500));
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-bg-card border border-brand-primary/30 p-8 rounded-3xl flex flex-col items-center justify-center gap-4 text-center min-h-[320px]"
      >
        <CheckCircle2 className="w-14 h-14 text-brand-primary" />
        <h3 className="text-xl font-bold text-gray-100">Message Sent!</h3>
        <p className="text-gray-400">
          Thanks for reaching out. I'll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-outline text-sm mt-2"
        >
          Send Another
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-bg-card border border-white/5 p-8 rounded-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="contact-name"
              className="text-sm font-medium text-gray-400"
            >
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-brand-primary/50 outline-none transition-all"
              placeholder="Your Name"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="contact-email"
              className="text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-brand-primary/50 outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="contact-message"
            className="text-sm font-medium text-gray-400"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-brand-primary/50 outline-none transition-all resize-none"
            placeholder="Tell me about your project..."
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full btn-primary justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending...
            </>
          ) : (
            <>
              Send Message <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />

          <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-widest"
            >
              Available for projects
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            >
              {DATA.name.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={cn(
                    "inline-block mr-4",
                    i === 2 &&
                      "text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-400",
                  )}
                >
                  {word}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              {DATA.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#projects" className="btn-primary">
                View Projects <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-outline">
                Get in Touch
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-16 flex flex-col items-center animate-bounce"
            >
              <div className="w-px h-12 bg-gradient-to-b from-brand-primary to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section-padding bg-bg-accent/30">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="About Me"
              subtitle="Get to know the developer behind the code."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-gray-300 text-lg leading-relaxed">
                  {DATA.about}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {DATA.titles.map((title, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      <span className="text-sm font-medium">{title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <PhotoStack
                  images={[
                    {
                      id: "casual",
                      src: jovanCasual,
                      alt: "Jovan Casual",
                      label: "Casual",
                    },
                    {
                      id: "formal",
                      src: jovanFormal,
                      alt: "Jovan Formal",
                      label: "Formal",
                    },
                  ]}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Tech Stack"
              subtitle="Technologies I use to bring ideas to life."
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {DATA.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card flex flex-col items-center justify-center text-center gap-3 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-bg-accent flex items-center justify-center text-gray-400 group-hover:text-brand-primary group-hover:bg-brand-primary/10 transition-all">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-300">
                      {skill.name}
                    </h3>
                    {skill.category && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary/60 mt-0.5 block">
                        {skill.category}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-padding bg-bg-accent/30">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Featured Work"
              subtitle="A selection of my recent projects, showcasing both mobile and full-stack expertise."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {DATA.projects.map((project, i) => (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex flex-col bg-bg-card rounded-2xl border border-white/5 overflow-hidden hover:border-brand-primary/30 transition-all duration-500"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-60" />
                      {project.link !== "#" && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-4 right-4 p-2 rounded-full bg-bg-dark/80 backdrop-blur-md text-white hover:bg-brand-primary transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-brand-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 text-gray-500 border border-white/5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeader
                  title="Let's Connect"
                  subtitle="Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative ideas."
                />

                <div className="space-y-8 mt-12">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${DATA.contact.email}`}
                        className="text-lg text-gray-200 hover:text-brand-primary transition-colors"
                      >
                        {DATA.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">
                        GitHub
                      </p>
                      <a
                        href={`https://github.com/${DATA.contact.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-gray-200 hover:text-brand-primary transition-colors"
                      >
                        github.com/{DATA.contact.github}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <Linkedin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">
                        LinkedIn
                      </p>
                      <a
                        href={`https://${DATA.contact.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-gray-200 hover:text-brand-primary transition-colors"
                      >
                        Joe Aqilla Vandyta
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h2 className="text-xl font-bold text-brand-primary mb-2">
              {DATA.nickname}.
            </h2>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Joe Aqilla Vandyta. All rights
              reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href={`https://github.com/${DATA.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-brand-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={`https://${DATA.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-brand-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${DATA.contact.email}`}
              className="text-gray-500 hover:text-brand-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <div>
            <a
              href="#home"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-primary transition-colors group"
            >
              Back to top{" "}
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
