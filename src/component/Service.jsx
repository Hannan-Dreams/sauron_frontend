import { CodeXml, Keyboard, LaptopMinimal, ArrowLeft, Zap, Target, TrendingUp, Shield, Award, Sparkles, CheckCircle2, Rocket, Users, Star, Heart } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);
  const detailsRef = useRef(null);
  const sectionTopRef = useRef(null);

  const services = [
    {
      title: "Web Development",
      icon: <LaptopMinimal />,
      shortDesc: "Modern, responsive websites that convert visitors to customers",
      fullDesc: "Transform your business with a stunning web presence that doesn't just look good—it drives results. From sleek landing pages to complex web applications, I build digital experiences that engage users and accelerate growth.",
      tagline: "Build Your Digital Empire",
      stats: [
        { value: "100%", label: "Mobile Responsive" },
        { value: "A+", label: "Performance Score" },
        { value: "24/7", label: "Support Available" }
      ],
      features: [
        { text: "Custom responsive design tailored to your brand", icon: <Users className="w-5 h-5" /> },
        { text: "Full-stack development (React, Node.js, databases)", icon: <CodeXml className="w-5 h-5" /> },
        { text: "E-commerce & business websites", icon: <TrendingUp className="w-5 h-5" /> },
        { text: "Smooth animations & interactive experiences", icon: <Sparkles className="w-5 h-5" /> }
      ],
      benefits: [
        { text: "Lightning-fast load times (under 2 seconds)", icon: <Zap className="w-5 h-5" /> },
        { text: "SEO-optimized to rank on Google's first page", icon: <TrendingUp className="w-5 h-5" /> },
        { text: "Secure, scalable architecture that grows with you", icon: <Shield className="w-5 h-5" /> },
        { text: "Ongoing support & maintenance included", icon: <Heart className="w-5 h-5" /> }
      ],
      process: [
        "Discovery call to understand your vision",
        "Custom design mockups for your approval",
        "Development with regular progress updates",
        "Launch, testing & post-launch support"
      ],
      testimonial: {
        text: "Working with Hannan was a game-changer. Our new website increased conversions by 40% in the first month!",
        author: "Sarah K., Business Owner"
      },
      link: "https://topmate.io/the_sauron/1693712",
      color: "from-red-500 to-rose-500",
      accentColor: "text-red-500",
      bgColor: "bg-red-500/5",
      borderColor: "border-red-500/20"
    },
    {
      title: "Gadget Advice",
      icon: <Keyboard />,
      shortDesc: "Expert gadget recommendations tailored to your needs",
      fullDesc: "Stop wasting money on overhyped tech that doesn't fit your needs. Get honest, personalized recommendations from someone who's tested hundreds of devices and knows what actually works.",
      tagline: "Smart Tech Choices, Zero Regrets",
      stats: [
        { value: "500+", label: "Devices Reviewed" },
        { value: "₹2L+", label: "Saved for Clients" },
        { value: "100%", label: "Unbiased Advice" }
      ],
      features: [
        { text: "Smartphones & laptops for every budget", icon: <LaptopMinimal className="w-5 h-5" /> },
        { text: "Audio gear (headphones, earbuds, speakers)", icon: <Sparkles className="w-5 h-5" /> },
        { text: "Gaming peripherals & accessories", icon: <Star className="w-5 h-5" /> },
        { text: "Smart home & productivity gadgets", icon: <TrendingUp className="w-5 h-5" /> }
      ],
      benefits: [
        { text: "Save thousands by avoiding marketing hype", icon: <Award className="w-5 h-5" /> },
        { text: "Get recommendations based on YOUR needs, not ads", icon: <Shield className="w-5 h-5" /> },
        { text: "Stay updated on the latest tech without the noise", icon: <Rocket className="w-5 h-5" /> },
        { text: "Budget-friendly alternatives to expensive flagships", icon: <Heart className="w-5 h-5" /> }
      ],
      process: [
        "Share your requirements & budget",
        "Get 3-5 personalized recommendations",
        "Detailed comparison of pros & cons",
        "Follow-up support after purchase"
      ],
      testimonial: {
        text: "Hannan saved me from buying an overpriced laptop. His recommendation was perfect for my needs and saved me ₹30,000!",
        author: "Rahul M., Software Engineer"
      },
      link: "https://topmate.io/the_sauron/1681422",
      color: "from-blue-500 to-cyan-500",
      accentColor: "text-blue-500",
      bgColor: "bg-blue-500/5",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Coding Guidance",
      icon: <CodeXml />,
      shortDesc: "Personalized learning paths to master programming",
      fullDesc: "Skip the confusion and learn to code the right way. Get personalized 1-on-1 mentorship that takes you from complete beginner to job-ready developer—faster than any bootcamp or course.",
      tagline: "Your Fast Track to a Tech Career",
      stats: [
        { value: "50+", label: "Students Mentored" },
        { value: "85%", label: "Job Placement Rate" },
        { value: "6 months", label: "Avg. Time to Hired" }
      ],
      features: [
        { text: "1-on-1 personalized tutoring sessions", icon: <Users className="w-5 h-5" /> },
        { text: "Custom learning roadmap for your goals", icon: <Target className="w-5 h-5" /> },
        { text: "Real-world project building for portfolio", icon: <Rocket className="w-5 h-5" /> },
        { text: "Interview prep & resume review", icon: <Award className="w-5 h-5" /> }
      ],
      benefits: [
        { text: "Learn 3x faster with personalized attention", icon: <Zap className="w-5 h-5" /> },
        { text: "Avoid tutorial hell with structured roadmaps", icon: <Target className="w-5 h-5" /> },
        { text: "Build impressive projects that get you hired", icon: <Rocket className="w-5 h-5" /> },
        { text: "Get honest feedback on your code & career path", icon: <CheckCircle2 className="w-5 h-5" /> }
      ],
      process: [
        "Free consultation to assess your goals",
        "Custom learning roadmap creation",
        "Weekly 1-on-1 sessions + project work",
        "Job prep, portfolio review & interview coaching"
      ],
      testimonial: {
        text: "Hannan's mentorship was invaluable. I went from zero coding knowledge to landing my first dev job in 7 months!",
        author: "Priya S., Frontend Developer"
      },
      link: "https://topmate.io/the_sauron/1693712",
      color: "from-purple-500 to-pink-500",
      accentColor: "text-purple-500",
      bgColor: "bg-purple-500/5",
      borderColor: "border-purple-500/20"
    }
  ];

  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.service-item, .section-title');
      elements.forEach(el => observer.observe(el));
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Scroll to details when service is selected, or to top when deselected
  useEffect(() => {
    if (selectedService !== null && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (selectedService === null && sectionTopRef.current) {
      setTimeout(() => {
        sectionTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedService]);

  const handleBackToServices = () => {
    setSelectedService(null);
  };

  return (
    <div id="services-section" className="relative py-24 px-4 min-h-screen bg-black" ref={parallaxRef}>
      {/* Scroll anchor for top of section */}
      <div ref={sectionTopRef} className="absolute top-0"></div>

      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        {/* Section Header - Minimal */}
        <div className="text-center mb-20 section-title opacity-0">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white tracking-tight">
            Services
          </h1>
          <p className="text-lg text-neutral-400 max-w-xl mx-auto font-light">
            Comprehensive digital solutions to help you thrive
          </p>
        </div>

        {/* Services Cards Grid - Minimal Design */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ${selectedService !== null ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => setSelectedService(index)}
              className="service-item opacity-0 group cursor-pointer bg-neutral-900/40 backdrop-blur-sm rounded-lg p-8 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:bg-neutral-900/60"
            >
              {/* Icon - Minimal */}
              <div className="w-12 h-12 mb-6 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors duration-300">
                <div className="text-3xl">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-white">
                {service.title}
              </h3>
              <p className="text-neutral-400 mb-6 text-sm leading-relaxed line-clamp-2">
                {service.shortDesc}
              </p>

              {/* Minimal CTA */}
              <div className="flex items-center text-sm font-medium text-neutral-500 group-hover:text-white transition-colors">
                Learn more
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Service View - Minimal & Confident */}
        {selectedService !== null && (
          <div ref={detailsRef} className="animate-slide-in">
            {/* Minimal Back button */}
            <button
              onClick={handleBackToServices}
              className="mb-12 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-300 group"
            >
              <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to services</span>
            </button>

            {/* Service Details Card - Clean & Minimal */}
            <div className="bg-neutral-900/40 backdrop-blur-sm rounded-lg border border-neutral-800 overflow-hidden">
              {/* Content */}
              <div className="px-8 md:px-16 py-16">
                {/* Icon - Minimal */}
                <div className={`w-16 h-16 mb-8 flex items-center justify-center ${services[selectedService].accentColor}`}>
                  <div className="text-5xl">
                    {services[selectedService].icon}
                  </div>
                </div>

                {/* Tagline - Subtle */}
                <p className="text-sm font-medium text-neutral-500 mb-4 uppercase tracking-wider">
                  {services[selectedService].tagline}
                </p>

                {/* Title */}
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                  {services[selectedService].title}
                </h2>

                {/* Description */}
                <p className="text-xl text-neutral-300 mb-12 leading-relaxed max-w-3xl font-light">
                  {services[selectedService].fullDesc}
                </p>

                {/* Stats - Social Proof */}
                <div className="grid grid-cols-3 gap-6 mb-16 max-w-2xl">
                  {services[selectedService].stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className={`text-3xl md:text-4xl font-bold mb-2 ${services[selectedService].accentColor}`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-neutral-500 font-light">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="w-16 h-px bg-neutral-800 mb-16"></div>

                {/* Two column layout - Clean */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                  {/* Features */}
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 mb-8 uppercase tracking-wider">What You Get</h3>
                    <div className="space-y-6">
                      {services[selectedService].features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-4 group">
                          <div className={`mt-0.5 ${services[selectedService].accentColor} opacity-60 group-hover:opacity-100 transition-opacity`}>
                            {feature.icon}
                          </div>
                          <span className="text-neutral-300 text-base font-light">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 mb-8 uppercase tracking-wider">Why It Matters</h3>
                    <div className="space-y-6">
                      {services[selectedService].benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-4 group">
                          <div className={`mt-0.5 ${services[selectedService].accentColor} opacity-60 group-hover:opacity-100 transition-opacity`}>
                            {benefit.icon}
                          </div>
                          <span className="text-neutral-300 text-base font-light">{benefit.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-16 h-px bg-neutral-800 mb-16"></div>

                {/* Process Timeline */}
                <div className="mb-16">
                  <h3 className="text-sm font-semibold text-neutral-500 mb-8 uppercase tracking-wider">How It Works</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services[selectedService].process.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div className={`text-sm font-bold mb-3 ${services[selectedService].accentColor} opacity-50`}>
                          Step {idx + 1}
                        </div>
                        <p className="text-neutral-300 text-sm font-light leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-16 h-px bg-neutral-800 mb-16"></div>

                {/* Testimonial */}
                <div className="mb-16 max-w-3xl">
                  <h3 className="text-sm font-semibold text-neutral-500 mb-8 uppercase tracking-wider">Client Success Story</h3>
                  <div className="bg-neutral-900/60 rounded-lg p-8 border border-neutral-800">
                    <div className="flex gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 fill-current ${services[selectedService].accentColor}`} />
                      ))}
                    </div>
                    <p className="text-lg text-neutral-300 mb-4 italic font-light leading-relaxed">
                      "{services[selectedService].testimonial.text}"
                    </p>
                    <p className="text-sm text-neutral-500 font-medium">
                      — {services[selectedService].testimonial.author}
                    </p>
                  </div>
                </div>

                {/* CTA Buttons - Minimal & Confident */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={services[selectedService].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium rounded hover:bg-neutral-200 transition-colors duration-300 group"
                  >
                    Book a Free Call
                    <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={handleBackToServices}
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-neutral-400 font-medium border border-neutral-800 rounded hover:text-white hover:border-neutral-700 transition-all duration-300 group"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    View Other Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease forwards;
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease forwards;
        }
        .service-item:nth-child(1) { animation-delay: 0.1s; }
        .service-item:nth-child(2) { animation-delay: 0.2s; }
        .service-item:nth-child(3) { animation-delay: 0.3s; }
        .section-title { animation-delay: 0s; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};