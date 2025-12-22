import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { FiMail, FiHeart } from 'react-icons/fi';

export const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => navigate(route), 300);
  };

  const quickLinks = [
    { label: 'Home', route: '/' },
    { label: 'Services', route: '/service' },
    { label: 'Code & Projects', route: '/code' },
    { label: 'About Me', route: '/about' }
  ];

  const services = [
    { href: 'https://topmate.io/the_sauron/1681422', label: 'Smartphone Buying Guide' },
    { href: 'https://topmate.io/the_sauron/1681422', label: 'Laptop & Gadget Suggestions' },
    { href: 'https://topmate.io/the_sauron/1693712', label: 'Coding Tuition & Guidance' },
    { label: 'Web Development', route: '/service' },
    { label: 'Tech Consulting', route: '/service' }
  ];

  const socialLinks = [
    {
      icon: <FaInstagram className="text-xl" />,
      href: 'https://www.instagram.com/the_sauron__/',
      label: 'Instagram',
      color: 'hover:bg-pink-500/20 hover:text-pink-400'
    },
    {
      icon: <FiMail className="text-xl" />,
      href: 'mailto:thesauron.tech@gmail.com',
      label: 'Email',
      color: 'hover:bg-red-500/20 hover:text-red-400'
    },
    {
      icon: <FaYoutube className="text-xl" />,
      href: '#',
      label: 'YouTube',
      color: 'hover:bg-red-600/20 hover:text-red-500'
    },
    {
      icon: <FaGithub className="text-xl" />,
      href: '#',
      label: 'GitHub',
      color: 'hover:bg-purple-500/20 hover:text-purple-400'
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      href: '#',
      label: 'LinkedIn',
      color: 'hover:bg-blue-500/20 hover:text-blue-400'
    },
    {
      icon: <FaTwitter className="text-xl" />,
      href: '#',
      label: 'Twitter',
      color: 'hover:bg-sky-500/20 hover:text-sky-400'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-neutral-900 to-black text-white py-16 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div
              onClick={() => handleNavigation('/')}
              className="flex items-center mb-6 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-rose-500 p-0.5 mr-3 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">TS</span>
                </div>
              </div>
              <span className="text-white font-bold text-2xl bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                the Sauron
              </span>
            </div>
            <p className="text-neutral-400 mb-6 leading-relaxed text-sm">
              Creating digital excellence through innovative solutions and cutting-edge technology. Your trusted partner for tech insights and professional services.
            </p>

            {/* Social Media Grid */}
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`w-full h-10 rounded-lg bg-white/5 flex items-center justify-center transition-all duration-300 group border border-white/10 ${social.color}`}
                  title={social.label}
                >
                  <span className="text-neutral-400 group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></span>
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  {service.href ? (
                    <a
                      href={service.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors duration-300 flex items-center group text-sm"
                    >
                      <span className="w-1 h-1 bg-neutral-600 rounded-full mr-3 group-hover:bg-red-500 transition-colors"></span>
                      {service.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => handleNavigation(service.route)}
                      className="text-neutral-400 hover:text-white transition-colors duration-300 flex items-center group text-sm w-full text-left"
                    >
                      <span className="w-1 h-1 bg-neutral-600 rounded-full mr-3 group-hover:bg-red-500 transition-colors"></span>
                      {service.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(link.route)}
                    className="text-neutral-400 hover:text-white transition-colors duration-300 flex items-center group text-sm w-full text-left"
                  >
                    <span className="w-1 h-1 bg-neutral-600 rounded-full mr-3 group-hover:bg-red-500 transition-colors"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></span>
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mr-3 group-hover:bg-red-500/20 transition-colors flex-shrink-0">
                  <FiMail className="text-red-400" />
                </div>
                <div>
                  <p className="text-neutral-400 text-xs mb-1">Email</p>
                  <a
                    href="mailto:thesauron.tech@gmail.com"
                    className="text-white hover:text-red-400 transition-colors text-sm break-all"
                  >
                    thesauron.tech@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center mr-3 group-hover:bg-pink-500/20 transition-colors flex-shrink-0">
                  <FaInstagram className="text-pink-400" />
                </div>
                <div>
                  <p className="text-neutral-400 text-xs mb-1">Instagram</p>
                  <a
                    href="https://www.instagram.com/the_sauron__/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-pink-400 transition-colors text-sm"
                  >
                    @the_sauron__
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Available for freelance projects and consultations. Let's build something amazing together!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 flex items-center text-sm">
              © {new Date().getFullYear()} The Sauron. Made with
              <FiHeart className="text-red-500 mx-1 animate-pulse" />
              and lots of ☕
            </p>

            <div className="flex items-center space-x-6 text-sm">
              <button
                onClick={() => handleNavigation('/about')}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNavigation('/about')}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-0 left-1/2 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
      </div>
    </footer>
  );
};