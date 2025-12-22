import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCode, FaServicestack, FaUserAlt, FaBriefcase, FaBlog, FaEnvelope } from 'react-icons/fa';

export const Second = () => {
    const navigate = useNavigate();

    const pages = [
        {
            id: 'services',
            title: 'Services',
            description: 'Professional web development, tech consulting, and digital solutions tailored to your needs',
            icon: <FaServicestack className="w-8 h-8" />,
            route: '/service',
        },
        {
            id: 'code',
            title: 'Code & Projects',
            description: 'Explore cutting-edge projects, open-source contributions, and technical tutorials',
            icon: <FaCode className="w-8 h-8" />,
            route: '/code',
        },
        {
            id: 'blog',
            title: 'Tech Insights',
            description: 'Stay updated with latest tech trends, coding tips, and industry best practices',
            icon: <FaBlog className="w-8 h-8" />,
            route: '/code',
        },
        {
            id: 'contact',
            title: 'Get In Touch',
            description: 'Let\'s collaborate! Reach out for projects, consultations, or just to connect',
            icon: <FaEnvelope className="w-8 h-8" />,
            route: '/about',
        }
    ];

    const handleCardClick = (route) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => navigate(route), 300);
    };

    return (
        <section className="relative min-h-screen flex items-center py-16 px-6">
            {/* Background */}
            <div className="absolute inset-0 bg-neutral-950"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                {/* Section Header - Minimalist */}
                <div className="text-center mb-16">
                    <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
                        Your Gateway to Excellence
                    </p>

                    <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
                        Explore My Digital Universe
                    </h2>

                    <p className="text-neutral-500 text-sm max-w-2xl mx-auto mb-3">
                        Discover innovative solutions, cutting-edge projects, and expert insights that drive success
                    </p>

                    <p className="text-neutral-600 text-xs max-w-xl mx-auto">
                        Click any card below to dive into a world of technology, creativity, and professional excellence
                    </p>
                </div>

                {/* Cards Grid - Minimalist */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pages.map((page, index) => (
                        <div
                            key={page.id}
                            onClick={() => handleCardClick(page.route)}
                            className="group relative cursor-pointer bg-neutral-900/30 border border-white/5 p-8 transition-all duration-300 hover:border-white/10"
                            style={{
                                animationDelay: `${index * 50}ms`,
                            }}
                        >
                            {/* Icon */}
                            <div className="mb-6 text-neutral-400 opacity-40 group-hover:opacity-60 transition-opacity">
                                {page.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-light mb-3 text-white group-hover:text-neutral-300 transition-colors">
                                {page.title}
                            </h3>

                            <p className="text-neutral-500 text-xs leading-relaxed mb-6">
                                {page.description}
                            </p>

                            {/* CTA */}
                            <div className="flex items-center text-xs text-neutral-500 group-hover:text-white transition-colors pt-4 border-t border-white/5">
                                <span className="mr-2">Explore</span>
                                <svg
                                    className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA - Minimalist */}
                <div className="text-center mt-16">
                    <p className="text-neutral-500 text-sm mb-2">
                        Ready to transform your ideas into reality?
                    </p>
                    <p className="text-neutral-600 text-xs">
                        Click any card above to start your journey
                    </p>
                </div>
            </div>
        </section>
    );
};
