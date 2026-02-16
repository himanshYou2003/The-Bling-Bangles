'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Construct mailto link
    const subject = `Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:theblingbangles12@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open mailto link
    window.location.href = mailtoLink;
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-brand-bg text-zinc-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-gold opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent opacity-5 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-brand-gold uppercase tracking-[0.4em] text-xs mb-4 block">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-8xl font-mosseta mb-6 text-zinc-900">
              Contact Us
            </h1>
            <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-8" />
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              We'd love to hear from you. Whether you have a question about our collection, pricing, or anything else, our team is ready to answer all your questions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/40 backdrop-blur-md border border-brand-gold/10 p-8 md:p-12 rounded-sm shadow-sm">
                <h2 className="text-3xl font-serif mb-8 text-brand-gold">Send us a Message</h2>
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10 text-brand-gold" />
                    </div>
                    <h3 className="text-2xl font-serif mb-4 text-zinc-900">Thank You!</h3>
                    <p className="text-zinc-600">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm uppercase tracking-widest text-brand-gold mb-3">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/60 border border-brand-gold/10 px-6 py-4 text-zinc-900 placeholder-zinc-400 focus:border-brand-gold focus:outline-none transition-colors rounded-sm"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm uppercase tracking-widest text-brand-gold mb-3">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/60 border border-brand-gold/10 px-6 py-4 text-zinc-900 placeholder-zinc-400 focus:border-brand-gold focus:outline-none transition-colors rounded-sm"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm uppercase tracking-widest text-brand-gold mb-3">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-white/60 border border-brand-gold/10 px-6 py-4 text-zinc-900 placeholder-zinc-400 focus:border-brand-gold focus:outline-none transition-colors rounded-sm"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="block text-sm uppercase tracking-widest text-brand-gold mb-3">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full bg-white/60 border border-brand-gold/10 px-6 py-4 text-zinc-900 placeholder-zinc-400 focus:border-brand-accent focus:outline-none transition-colors resize-none rounded-sm"
                        placeholder="Tell us about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="group relative w-full bg-brand-accent text-white py-5 px-8 font-bold uppercase tracking-[0.3em] text-xs transition-all hover:bg-brand-gold shadow-xl shadow-brand-accent/10 rounded-sm overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Send Message
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* Visit Us */}
              {/* <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d29417]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#d29417]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif mb-3 text-[#d29417]">Visit Our Showroom</h3>
                    <p className="text-gray-300 leading-relaxed">
                      123 Luxury Lane, Bandra West<br />
                      Mumbai, Maharashtra 400050<br />
                      India
                    </p>
                  </div>
                </div>
              </div> */}

               {/* Call Us */}
              <div className="bg-white/40 backdrop-blur-md border border-brand-gold/10 p-8 rounded-sm shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif mb-3 text-brand-gold">Call Us</h3>
                    <p className="text-zinc-600 leading-relaxed">
                      +91 828284636<br />
                      <span className="text-sm text-zinc-400">Mon-Sat, 10 AM - 8 PM</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Us */}
              <div className="bg-white/40 backdrop-blur-md border border-brand-gold/10 p-8 rounded-sm shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif mb-3 text-brand-gold">Email Us</h3>
                    <p className="text-zinc-600 leading-relaxed">
                      theblingbangles12@gmail.com<br />
                      <span className="text-sm text-zinc-400">We reply within 24 hours</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white/40 backdrop-blur-md border border-brand-gold/10 p-8 rounded-sm shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif mb-3 text-brand-gold">Business Hours</h3>
                    <div className="text-zinc-600 space-y-2">
                      <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                      <p>Sunday: 11:00 AM - 6:00 PM</p>
                      <p className="text-sm text-zinc-400">Appointment preferred</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-brand-gold/10 to-brand-accent/10 backdrop-blur-md border border-brand-gold/20 p-8 rounded-sm shadow-sm">
                <h3 className="text-xl font-serif mb-6 text-brand-gold">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/blingbanglesofficial?igsh=MXRvbmhhanA1bTNuYQ=="
                    target='_blank'
                    className="w-12 h-12 bg-white/20 hover:bg-brand-gold border border-white/20 rounded-full flex items-center justify-center transition-all group"
                  >
                    <Instagram className="w-5 h-5 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Decorative Quote Section */}
       <section className="py-20 px-6 border-t border-brand-gold/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-8">
            <div className="text-6xl md:text-8xl text-brand-gold/20 font-serif">"</div>
          </div>
          <p className="text-2xl md:text-4xl font-serif italic text-brand-gold mb-8 leading-relaxed">
            Every piece tells a story of elegance, crafted with passion and precision for the discerning connoisseur.
          </p>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto" />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
