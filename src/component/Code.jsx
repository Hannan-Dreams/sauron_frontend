import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCode, FaRocket, FaBrain, FaCloud } from 'react-icons/fa';

export const Code = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      route: 'dsa',
      title: "Data Structures & Algorithms",
      icon: <FaCode className="w-8 h-8" />,
      gradient: 'from-emerald-500/20 to-teal-500/20',
      accentColor: 'text-emerald-400',
      stats: { lessons: "150+", difficulty: "Advanced" }
    },
    {
      id: 2,
      route: 'fullstack',
      title: "Full Stack Web Development",
      icon: <FaRocket className="w-8 h-8" />,
      gradient: 'from-blue-500/20 to-indigo-500/20',
      accentColor: 'text-blue-400',
      stats: { lessons: "200+", difficulty: "Intermediate" }
    },
    {
      id: 3,
      route: 'ai',
      title: "AI Tools & Integration",
      icon: <FaBrain className="w-8 h-8" />,
      gradient: 'from-purple-500/20 to-pink-500/20',
      accentColor: 'text-purple-400',
      stats: { lessons: "80+", difficulty: "Intermediate" }
    },
    {
      id: 4,
      route: 'devops',
      title: "DevOps & Cloud",
      icon: <FaCloud className="w-8 h-8" />,
      gradient: 'from-orange-500/20 to-red-500/20',
      accentColor: 'text-orange-400',
      stats: { lessons: "120+", difficulty: "Advanced" }
    }
  ];

  const dsaLevels = [
    {
      level: 'basic',
      title: 'Basic',
      emoji: '📚',
      badge: 'Beginner',
      description: 'Start your DSA journey with fundamental concepts and easy problems',
      gradient: 'from-green-500/20 to-emerald-500/20',
      accentColor: 'text-green-400',
    },
    {
      level: 'medium',
      title: 'Medium',
      emoji: '🎯',
      badge: 'Intermediate',
      description: 'Challenge yourself with intermediate problems and advanced techniques',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      accentColor: 'text-blue-400',
    },
    {
      level: 'advanced',
      title: 'Advanced',
      emoji: '🚀',
      badge: 'Expert',
      description: 'Master complex algorithms and solve the hardest problems',
      gradient: 'from-purple-500/20 to-pink-500/20',
      accentColor: 'text-purple-400',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-16 px-6'>
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* DSA Practice Levels Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-xs uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 font-semibold">
                Practice Makes Perfect
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              DSA Practice Levels
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Start solving problems based on your skill level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dsaLevels.map((level, index) => (
              <div
                key={level.level}
                className={`group relative overflow-hidden bg-gradient-to-br ${level.gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 cursor-pointer hover:scale-105 hover:border-white/30 hover:shadow-2xl`}
                onClick={() => navigate(`/code/dsa/${level.level}`)}
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards` }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl opacity-60 group-hover:scale-110 transition-transform duration-500">{level.emoji}</span>
                    <span className={`px-3 py-1 text-xs rounded-full bg-white/10 ${level.accentColor} border border-white/20 uppercase tracking-wider font-semibold`}>
                      {level.badge}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-300 transition-all">
                    {level.title}
                  </h3>

                  <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                    {level.description}
                  </p>

                  <div className={`flex items-center gap-2 ${level.accentColor} pt-4 border-t border-white/10 group-hover:gap-4 transition-all`}>
                    <span className="text-sm font-semibold">View Problems</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="text-xs uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 font-semibold">
              Explore Learning Paths
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
            Master Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 animate-gradient">
              Craft
            </span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Choose your learning path and dive deep into the technologies that power modern software development
          </p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`group relative overflow-hidden bg-gradient-to-br ${card.gradient} backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-500 cursor-pointer hover:scale-105 hover:border-white/30 hover:shadow-2xl`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(`/code/${card.route}`)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`
              }}
            >
              {/* Card content */}
              <div className="p-6 relative z-10">
                {/* Icon */}
                <div className={`${card.accentColor} mb-6 transform transition-transform duration-500 ${hoveredCard === card.id ? 'scale-110 rotate-3' : ''}`}>
                  {card.icon}
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-300 transition-all">
                  {card.title}
                </h2>

                {/* Stats */}
                <div className="flex gap-2 mb-6">
                  <span className={`px-3 py-1 text-xs rounded-full bg-white/10 ${card.accentColor} border border-white/20`}>
                    {card.stats.lessons}
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-neutral-400 border border-white/20">
                    {card.stats.difficulty}
                  </span>
                </div>

                {/* CTA */}
                <div className={`flex items-center gap-2 text-sm ${card.accentColor} pt-4 border-t border-white/10 group-hover:gap-4 transition-all`}>
                  <span>View Topics</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>

              {/* Hover Overlay */}
              {hoveredCard === card.id && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <div className="relative bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 border border-white/10 rounded-3xl p-12 backdrop-blur-sm overflow-hidden">
            {/* Gradient Orb */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-white mb-4">
                Ready to Level Up Your Skills?
              </h3>
              <p className="text-neutral-400 mb-8 text-lg">
                Join thousands of developers mastering these technologies
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
                  Get Started Free
                </button>
                <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/5 hover:border-white/30">
                  View All Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
