import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMobileAlt, FaLaptop, FaHeadphones, FaTv, FaKeyboard, FaMouse, FaClock, FaTabletAlt, FaThLarge } from 'react-icons/fa';

export const Tech = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const navigate = useNavigate();

    const techCategories = [
        {
            id: 0,
            route: 'all-products',
            title: "All Products",
            description: "Browse our complete collection of tech products",
            icon: <FaThLarge className="w-8 h-8" />,
            gradient: 'from-pink-500/20 via-purple-500/20 to-cyan-500/20',
            accentColor: 'text-pink-400',
            stats: { products: "500+" }
        },
        {
            id: 1,
            route: 'mobile',
            title: "Mobile Phones",
            description: "Latest smartphones with cutting-edge technology",
            icon: <FaMobileAlt className="w-8 h-8" />,
            gradient: 'from-blue-500/20 to-cyan-500/20',
            accentColor: 'text-cyan-400',
            stats: { products: "50+" }
        },
        {
            id: 2,
            route: 'laptop',
            title: "Laptops",
            description: "High-performance laptops for work and gaming",
            icon: <FaLaptop className="w-8 h-8" />,
            gradient: 'from-purple-500/20 to-pink-500/20',
            accentColor: 'text-pink-400',
            stats: { products: "80+" }
        },
        {
            id: 3,
            route: 'keyboard',
            title: "Keyboards",
            description: "Mechanical and wireless keyboards",
            icon: <FaKeyboard className="w-8 h-8" />,
            gradient: 'from-green-500/20 to-emerald-500/20',
            accentColor: 'text-emerald-400',
            stats: { products: "40+" }
        },
        {
            id: 4,
            route: 'mouse',
            title: "Gaming Mice",
            description: "Precision gaming mice with high DPI",
            icon: <FaMouse className="w-8 h-8" />,
            gradient: 'from-orange-500/20 to-red-500/20',
            accentColor: 'text-orange-400',
            stats: { products: "35+" }
        },
        {
            id: 5,
            route: 'headphones',
            title: "Headphones",
            description: "Premium audio with noise cancellation",
            icon: <FaHeadphones className="w-8 h-8" />,
            gradient: 'from-violet-500/20 to-purple-500/20',
            accentColor: 'text-violet-400',
            stats: { products: "45+" }
        },
        {
            id: 6,
            route: 'monitor',
            title: "Monitors",
            description: "Ultra-wide and high-refresh-rate displays",
            icon: <FaTv className="w-8 h-8" />,
            gradient: 'from-amber-500/20 to-yellow-500/20',
            accentColor: 'text-amber-400',
            stats: { products: "60+" }
        },
        {
            id: 7,
            route: 'smartwatch',
            title: "Smartwatches",
            description: "Fitness tracking and smart notifications",
            icon: <FaClock className="w-8 h-8" />,
            gradient: 'from-rose-500/20 to-pink-500/20',
            accentColor: 'text-rose-400',
            stats: { products: "30+" }
        },
        {
            id: 8,
            route: 'tablet',
            title: "Tablets",
            description: "Versatile tablets for work and entertainment",
            icon: <FaTabletAlt className="w-8 h-8" />,
            gradient: 'from-indigo-500/20 to-blue-500/20',
            accentColor: 'text-indigo-400',
            stats: { products: "25+" }
        }
    ];

    return (
        <div className='min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-16 px-6'>
            {/* Animated Background Orbs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-16 text-center">
                    <div className="inline-block mb-4">
                        <span className="text-xs uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-semibold">
                            Browse Categories
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
                        Tech
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient">
                            Products
                        </span>
                    </h1>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Discover the latest gadgets and technology across all categories
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {techCategories.map((category, index) => (
                        <div
                            key={category.id}
                            className={`group relative overflow-hidden bg-gradient-to-br ${category.gradient} backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-500 cursor-pointer hover:scale-105 hover:border-white/30 hover:shadow-2xl`}
                            onMouseEnter={() => setHoveredCard(category.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            onClick={() => navigate(`/tech/${category.route}`)}
                            style={{
                                animation: `fadeInUp 0.6s ease-out ${index * 0.05}s backwards`
                            }}
                        >
                            {/* Card content */}
                            <div className="p-8 relative z-10">
                                {/* Icon */}
                                <div className={`${category.accentColor} mb-6 transform transition-transform duration-500 ${hoveredCard === category.id ? 'scale-110 rotate-3' : ''}`}>
                                    {category.icon}
                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-300 transition-all">
                                    {category.title}
                                </h2>

                                {/* Description */}
                                <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                                    {category.description}
                                </p>

                                {/* Stats and CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <span className={`text-sm font-semibold ${category.accentColor}`}>
                                        {category.stats.products}
                                    </span>
                                    <div className={`flex items-center gap-2 text-sm ${category.accentColor} group-hover:gap-4 transition-all`}>
                                        <span>Browse</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            {hoveredCard === category.id && (
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="max-w-7xl mx-auto mt-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { number: '500+', label: 'Products', gradient: 'from-cyan-400 to-blue-400' },
                            { number: '50+', label: 'Brands', gradient: 'from-purple-400 to-pink-400' },
                            { number: '100%', label: 'Authentic', gradient: 'from-emerald-400 to-teal-400' },
                            { number: '24/7', label: 'Support', gradient: 'from-orange-400 to-red-400' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center group cursor-default">
                                <div className={`text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                                    {stat.number}
                                </div>
                                <div className="text-neutral-400 text-sm uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="max-w-4xl mx-auto mt-20 text-center">
                    <div className="relative bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 border border-white/10 rounded-3xl p-12 backdrop-blur-sm overflow-hidden">
                        {/* Gradient Orb */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h3 className="text-4xl font-bold text-white mb-4">
                                Find Your Perfect Tech
                            </h3>
                            <p className="text-neutral-400 mb-8 text-lg">
                                Expert reviews and honest recommendations to help you choose
                            </p>
                            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
                                Explore All Products
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
