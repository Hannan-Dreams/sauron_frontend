import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCode, FaRocket, FaLightbulb, FaChartLine, FaStar, FaArrowRight } from 'react-icons/fa';

export const FeaturedContent = () => {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);

    const features = [
        {
            id: 'dsa',
            title: 'Master DSA',
            subtitle: 'Data Structures & Algorithms',
            description: 'Level up your coding skills with curated problems, detailed solutions, and progress tracking',
            icon: <FaCode className="w-8 h-8" />,
            gradient: 'from-emerald-500/20 to-teal-500/20',
            accentColor: 'emerald',
            route: '/code',
            stats: { label: 'Problems', value: '200+' },
        },
        {
            id: 'fullstack',
            title: 'Full Stack Dev',
            subtitle: 'Modern Web Development',
            description: 'Build scalable applications with React, Node.js, and cutting-edge technologies',
            icon: <FaRocket className="w-8 h-8" />,
            gradient: 'from-blue-500/20 to-indigo-500/20',
            accentColor: 'blue',
            route: '/code',
            stats: { label: 'Projects', value: '50+' },
        },
        {
            id: 'aitools',
            title: 'AI Tools',
            subtitle: 'Artificial Intelligence',
            description: 'Explore AI-powered tools, machine learning models, and automation solutions',
            icon: <FaLightbulb className="w-8 h-8" />,
            gradient: 'from-purple-500/20 to-pink-500/20',
            accentColor: 'purple',
            route: '/code',
            stats: { label: 'Tools', value: '30+' },
        },
        {
            id: 'devops',
            title: 'DevOps',
            subtitle: 'Cloud & Infrastructure',
            description: 'Master deployment, CI/CD pipelines, containerization, and cloud platforms',
            icon: <FaChartLine className="w-8 h-8" />,
            gradient: 'from-orange-500/20 to-red-500/20',
            accentColor: 'orange',
            route: '/code',
            stats: { label: 'Guides', value: '40+' },
        },
    ];

    const handleCardClick = (route) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => navigate(route), 300);
    };

    return (
        <section className="relative min-h-screen flex items-center py-20 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/95 to-neutral-950"></div>

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
            }}></div>

            {/* Gradient Orbs */}
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-full">
                        <FaStar className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                            Featured Learning Paths
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        Build Your
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
                            Tech Expertise
                        </span>
                    </h2>

                    <p className="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto mb-4">
                        Comprehensive resources, hands-on projects, and expert guidance to accelerate your tech journey
                    </p>

                    <p className="text-neutral-500 text-sm max-w-2xl mx-auto">
                        Whether you're starting out or leveling up, find everything you need to succeed
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            onMouseEnter={() => setHoveredCard(feature.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            onClick={() => handleCardClick(feature.route)}
                            className="group relative cursor-pointer"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Card Container */}
                            <div className={`relative bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full transition-all duration-500 hover:border-white/30 hover:scale-[1.02] hover:shadow-2xl`}>
                                {/* Glow Effect */}
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}></div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-${feature.accentColor}-500/10 border border-${feature.accentColor}-500/20 rounded-2xl mb-6 text-${feature.accentColor}-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                        {feature.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-300 transition-all duration-300">
                                        {feature.title}
                                    </h3>

                                    {/* Subtitle */}
                                    <p className={`text-${feature.accentColor}-400 text-sm font-semibold mb-4 uppercase tracking-wider`}>
                                        {feature.subtitle}
                                    </p>

                                    {/* Description */}
                                    <p className="text-neutral-400 text-base leading-relaxed mb-6">
                                        {feature.description}
                                    </p>

                                    {/* Stats & CTA */}
                                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                        <div>
                                            <div className={`text-2xl font-bold text-${feature.accentColor}-400`}>
                                                {feature.stats.value}
                                            </div>
                                            <div className="text-neutral-500 text-xs uppercase tracking-wider">
                                                {feature.stats.label}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all duration-300">
                                            <span className="text-sm font-semibold">Explore</span>
                                            <FaArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Overlay */}
                                {hoveredCard === feature.id && (
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 border border-white/10 rounded-3xl backdrop-blur-sm">
                        <p className="text-neutral-300 text-lg font-semibold">
                            Ready to start your learning journey?
                        </p>
                        <button
                            onClick={() => handleCardClick('/code')}
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50"
                        >
                            <span>View All Learning Paths</span>
                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                        <p className="text-neutral-500 text-sm">
                            Free resources • Expert guidance • Community support
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
