"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Globe, BookOpen, Users, Award, Star, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

const images = [
  "/girl.jpg",
  "/student.jpg",
  "/answer.jpg",
];

const stats = [
  { value: 50000, label: "Active Learners" },
  { value: 500, label: "Expert Instructors" },
  { value: 2000, label: "Courses Available" },
  { value: 98, label: "Satisfaction Rate" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Learning Director, Tech Corp",
    quote: "AuraLMS has revolutionized our employee training program with its intuitive interface and powerful analytics.",
  },
  {
    name: "Michael Chen",
    role: "University Professor",
    quote: "The platform's collaborative features have significantly enhanced our remote learning experience.",
  },
  {
    name: "Emma Wilson",
    role: "Lead Educator",
    quote: "Never seen such a perfect blend of flexibility and structure in an LMS before.",
  },
];

const socialIcons = [
  { name: "Facebook", icon: Facebook },
  { name: "Twitter", icon: Twitter },
  { name: "Instagram", icon: Instagram },
  { name: "Linkedin", icon: Linkedin },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 overflow-hidden">
      {/* Simplified Navbar with only Dashboard button */}
      <nav className="bg-gray-900/90 backdrop-blur-md py-5 px-6 md:px-16 fixed w-full z-50 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <Globe className="h-7 w-7 text-purple-500" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">AuraLMS</h1>
        </div>
        <Button 
          onClick={() => router.push('/auth/loginpage')}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Dashboard
        </Button>
      </nav>

      {/* Hero Section with dark gradients */}
      <header className="pt-32 pb-24 px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6 text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">Transform Your Learning Experience</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Advanced learning management system powered by AI-driven insights and interactive content
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:translate-y-1">
                Start Free Trial
              </Button>
              <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-900/30 px-10 py-6 text-lg rounded-full transition-all duration-300 transform hover:translate-y-1">
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Modernized Image Carousel */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full max-w-6xl mx-auto mt-16"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-30 blur-3xl rounded-3xl"></div>
            <div className="relative overflow-hidden rounded-3xl h-[500px] shadow-2xl border border-purple-800/30">
              <motion.div
                className="flex w-full h-full"
                animate={{
                  x: ["0%", "-100%", "-200%", "-100%"], 
                }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: "linear",
                }}
              >
                {images.concat(images[0]).map((src, index) => (
                  <div key={index} className="min-w-full">
                    <Image
                      src={src}
                      alt="Platform preview"
                      width={1200}
                      height={1200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-pink-400 opacity-10 rounded-full blur-3xl"></div>
      </header>

      {/* Features Section with dark theme */}
      <section className="py-24 px-6 bg-gray-900 relative border-t border-gray-800">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Empowering Modern Learners</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Comprehensive tools and features designed for effective learning outcomes
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Interactive Content", text: "Engage with multimedia courses & real-time collaboration" },
              { icon: Users, title: "Expert Community", text: "Connect with industry professionals & mentors" },
              { icon: Award, title: "Certifications", text: "Earn accredited credentials recognized by employers" },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700"
              >
                <div className="bg-purple-900/50 p-4 rounded-2xl inline-block mb-6">
                  <feature.icon className="h-10 w-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 relative border-t border-gray-800">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Join thousands of learners and organizations transforming education
            </p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <StatItem key={index} value={stat.value} label={stat.label} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with dark cards */}
      <section className="py-24 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Leading Organizations</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Join thousands of companies transforming their learning culture with AuraLMS
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-purple-900/50 flex items-center justify-center">
                    <Star className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic text-lg">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-900 to-pink-900 text-white border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Learning?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of organizations already using AuraLMS to power their learning initiatives
            </p>
            <Button 
              onClick={() => router.push('/auth/loginpage')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Redesigned Footer with Social Icons */}
      <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between mb-12">
            <div className="mb-8 md:mb-0 md:w-1/3">
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="h-7 w-7 text-purple-400" />
                <span className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">AuraLMS</span>
              </div>
              <p className="text-gray-400 mb-6">Empowering learners through innovative education technology</p>
              <div className="flex space-x-4">
                {socialIcons.map((social) => (
                  <a key={social.name} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-700 transition-colors">
                    <social.icon className="w-5 h-5 text-gray-300" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">
              <div>
                <h4 className="text-white font-semibold mb-4 text-lg">Product</h4>
                <ul className="space-y-3">
                  {['Features', 'Pricing', 'Security', 'Integrations'].map((item) => (
                    <li key={item}><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 text-lg">Company</h4>
                <ul className="space-y-3">
                  {['About', 'Careers', 'Contact', 'Blog'].map((item) => (
                    <li key={item}><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 text-lg">Stay Updated</h4>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-gray-800 rounded-full px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700" 
                  />
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm w-full rounded-full">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 AuraLMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatItem({ value, label, index }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setCount((prev) => (prev >= value ? value : prev + Math.ceil(value / 50)));
    }, 20);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="p-6 bg-gray-800 rounded-xl shadow-md border border-gray-700"
    >
      <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
        {count.toLocaleString()}+
      </div>
      <div className="text-gray-300 text-lg">{label}</div>
    </motion.div>
  );
}