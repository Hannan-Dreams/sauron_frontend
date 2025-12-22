import React, { useEffect, useRef, useState } from 'react';

export default function About() {
  const [visible, setVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '25+', label: 'Projects Completed' },
    { value: '2+', label: 'Years Experience' },
    { value: '∞', label: 'Cups of Coffee' },
    { value: '100%', label: 'Client Satisfaction' }
  ];

  const values = [
    {
      title: "Clarity & Simplicity",
      description: "I break down complex concepts into understandable, actionable solutions.",
      icon: "✨"
    },
    {
      title: "Practical Results",
      description: "Focus on what actually works in real-world scenarios, not just theory.",
      icon: "🚀"
    },
    {
      title: "Continuous Learning",
      description: "Staying updated with the latest technologies and approaches.",
      icon: "📚"
    }
  ];

  return (
    <section id="about-section" className="relative py-24 px-6 bg-gradient-to-b from-black to-neutral-900 overflow-hidden" ref={aboutRef}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header with animation */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1 bg-red-500/10 text-red-400 rounded-full text-sm font-medium mb-4">
            Behind The Screen
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
            About The Sauron
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-rose-500 mx-auto mb-6"></div>
        </div>

        {/* First row: Who I Am and My Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Who I Am */}
          <div className={`transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold text-white mb-4">Who I Am</h3>
            <p className="text-lg text-neutral-300 leading-relaxed">
              I'm The Sauron — a practical digital creator & software engineer focused on building real products, 
              sharing clear technical breakdowns, and helping people choose the right tools. I combine hands-on 
              development experience with design sensibility to deliver polished, reliable results.
            </p>
          </div>

          {/* My Approach */}
          <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold text-white mb-4">My Approach</h3>
            <p className="text-lg text-neutral-300 leading-relaxed">
              I emphasize clarity and measurable outcomes: rapid prototyping, regular user feedback, and 
              iterative improvements. Every project begins with understanding your goals, then moves through 
              practical design and engineering steps until the product is ready for real users.
            </p>
          </div>
        </div>

        {/* Second row: My Values and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* My Values */}
          <div className={`transition-all duration-700 delay-450 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold text-white mb-6">My Values</h3>
            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-start p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
                  <span className="text-2xl mr-4">{value.icon}</span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{value.title}</h4>
                    <p className="text-neutral-400">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className={`transition-all duration-700 delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-neutral-800/50 p-6 py-10 rounded-2xl border border-neutral-700 text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-neutral-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial snippet */}
        <div className={`mt-16 p-6 bg-neutral-800/30 rounded-2xl border border-neutral-700 text-center transition-all duration-700 delay-750 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-neutral-300 italic mb-2">"The Sauron delivers practical solutions that actually work in the real world."</p>
        </div>
      </div>
    </section>
  );
}