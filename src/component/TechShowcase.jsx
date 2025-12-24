import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMobileAlt, FaLaptop, FaHeadphones, FaTv, FaThLarge, FaKeyboard, FaMouse, FaClock, FaTabletAlt } from 'react-icons/fa';

export const TechShowcase = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState(0);

    const categories = [
        {
            name: 'All Products',
            route: 'all-products',
            icon: <FaThLarge className="w-6 h-6" />,
            tagline: 'Browse everything',
            gradient: 'from-pink-500/20 via-purple-500/20 to-cyan-500/20',
            accentColor: 'text-pink-400',
        },
        {
            name: 'Mobile Phones',
            route: 'mobile',
            icon: <FaMobileAlt className="w-6 h-6" />,
            tagline: 'Latest flagships & budget beasts',
            gradient: 'from-blue-500/20 to-cyan-500/20',
            accentColor: 'text-cyan-400',
        },
        {
            name: 'Laptops',
            route: 'laptop',
            icon: <FaLaptop className="w-6 h-6" />,
            tagline: 'Power meets portability',
            gradient: 'from-purple-500/20 to-pink-500/20',
            accentColor: 'text-pink-400',
        },
        {
            name: 'Keyboards',
            route: 'keyboard',
            icon: <FaKeyboard className="w-6 h-6" />,
            tagline: 'Mechanical & wireless precision',
            gradient: 'from-green-500/20 to-emerald-500/20',
            accentColor: 'text-emerald-400',
        },
        {
            name: 'Mouse',
            route: 'mouse',
            icon: <FaMouse className="w-6 h-6" />,
            tagline: 'Precision gaming control',
            gradient: 'from-orange-500/20 to-red-500/20',
            accentColor: 'text-orange-400',
        },
        {
            name: 'Headphones',
            route: 'headphones',
            icon: <FaHeadphones className="w-6 h-6" />,
            tagline: 'Immersive sound experiences',
            gradient: 'from-violet-500/20 to-purple-500/20',
            accentColor: 'text-violet-400',
        },
        {
            name: 'Monitors',
            route: 'monitor',
            icon: <FaTv className="w-6 h-6" />,
            tagline: 'Ultimate visual clarity',
            gradient: 'from-amber-500/20 to-yellow-500/20',
            accentColor: 'text-amber-400',
        },
        {
            name: 'Smartwatches',
            route: 'smartwatch',
            icon: <FaClock className="w-6 h-6" />,
            tagline: 'Fitness tracking & notifications',
            gradient: 'from-rose-500/20 to-pink-500/20',
            accentColor: 'text-rose-400',
        },
        {
            name: 'Tablets',
            route: 'tablet',
            icon: <FaTabletAlt className="w-6 h-6" />,
            tagline: 'Work & entertainment on the go',
            gradient: 'from-indigo-500/20 to-blue-500/20',
            accentColor: 'text-indigo-400',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCategory((prev) => (prev + 1) % categories.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleExplore = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => navigate('/tech'), 300);
    };

    return (
        <section className="relative min-h-screen flex items-center py-20 px-6 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950"></div>

            {/* Animated Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                {/* Main Heading */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="text-xs uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-semibold">
                            Tech Arsenal
                        </span>
                    </div>

                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                        Discover the
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient">
                            Future of Tech
                        </span>
                    </h2>

                    <p className="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto mb-4 leading-relaxed">
                        Curated reviews, expert insights, and honest recommendations on the latest gadgets and tech innovations
                    </p>

                    <p className="text-neutral-500 text-sm max-w-2xl mx-auto">
                        From cutting-edge smartphones to powerful laptops, immersive audio gear to professional cameras — find your perfect tech companion
                    </p>
                </div>

                {/* Category Showcase Grid */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((category, index) => (
                        <div
                            key={category.name}
                            onMouseEnter={() => setActiveCategory(index)}
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                setTimeout(() => navigate(`/tech/${category.route}`), 300);
                            }}
                            className={`group relative cursor-pointer transition-all duration-500 w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(14.285%-0.57rem)] ${activeCategory === index ? 'scale-105' : 'scale-100 opacity-70 hover:opacity-100'
                                }`}
                        >
                            <div className={`relative bg-gradient-to-br ${category.gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transition-all duration-500 ${activeCategory === index ? 'border-white/30 shadow-2xl' : 'hover:border-white/20'
                                }`}>
                                {/* Icon */}
                                <div className={`${category.accentColor} mb-4 transform transition-transform duration-500 ${activeCategory === index ? 'scale-110' : 'group-hover:scale-105'
                                    }`}>
                                    {category.icon}
                                </div>

                                {/* Category Name */}
                                <h3 className="text-white font-semibold text-sm mb-2">
                                    {category.name}
                                </h3>

                                {/* Tagline */}
                                <p className={`text-xs transition-all duration-500 ${activeCategory === index ? category.accentColor : 'text-neutral-500'
                                    }`}>
                                    {category.tagline}
                                </p>

                                {/* Active Indicator */}
                                {activeCategory === index && (
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {[
                        { number: '500+', label: 'Products Reviewed' },
                        { number: '50+', label: 'Brands Covered' },
                        { number: '100%', label: 'Honest Reviews' },
                        { number: '24/7', label: 'Updated Content' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center group cursor-default">
                            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                                {stat.number}
                            </div>
                            <div className="text-neutral-500 text-sm uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <button
                        onClick={handleExplore}
                        className="group relative inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
                    >
                        <span className="relative z-10">Explore Tech Arsenal</span>
                        <svg
                            className="w-5 h-5 relative z-10 transform group-hover:translate-x-2 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>

                        {/* Animated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </button>

                    <p className="text-neutral-500 text-sm mt-6">
                        Join thousands of tech enthusiasts making informed decisions
                    </p>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 right-10 w-20 h-20 border border-cyan-500/20 rounded-full animate-ping opacity-20"></div>
                <div className="absolute bottom-20 left-10 w-16 h-16 border border-purple-500/20 rounded-full animate-ping opacity-20"></div>
            </div>
        </section>
    );
};
