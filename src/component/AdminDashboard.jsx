import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../utils/auth';
import { API_ENDPOINTS } from '../config/api';
import { authenticatedFetch } from '../utils/auth';
import {
    FiDatabase,
    FiShoppingBag,
    FiTrendingUp,
    FiArrowRight,
    FiLayers,
    FiPackage
} from 'react-icons/fi';

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const user = getUser();
    const [stats, setStats] = useState({
        dsa: {
            total: 0,
            easy: 0,
            medium: 0,
            hard: 0
        },
        tech: {
            total: 0,
            byCategory: {}
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is admin
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);

            // Fetch DSA stats
            const dsaResponse = await fetch(API_ENDPOINTS.DSA.GET_ALL);
            const dsaData = await dsaResponse.json();

            if (dsaData.success) {
                const problems = dsaData.problems || [];
                const dsaStats = {
                    total: problems.length,
                    easy: problems.filter(p => p.difficulty === 'Easy').length,
                    medium: problems.filter(p => p.difficulty === 'Medium').length,
                    hard: problems.filter(p => p.difficulty === 'Hard').length
                };

                setStats(prev => ({ ...prev, dsa: dsaStats }));
            }

            // Fetch Tech products stats
            const techResponse = await fetch(API_ENDPOINTS.TECH_PRODUCTS.GET_ALL);
            const techData = await techResponse.json();

            if (techData.success) {
                const products = techData.data || [];
                const categoryCount = {};

                products.forEach(product => {
                    const category = product.category || 'uncategorized';
                    categoryCount[category] = (categoryCount[category] || 0) + 1;
                });

                setStats(prev => ({
                    ...prev,
                    tech: {
                        total: products.length,
                        byCategory: categoryCount
                    }
                }));
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const categoryLabels = {
        mobile: 'Mobile Phones',
        laptop: 'Laptops',
        keyboard: 'Keyboards',
        mouse: 'Gaming Mice',
        headphones: 'Headphones',
        monitor: 'Monitors',
        smartwatch: 'Smartwatches',
        tablet: 'Tablets',
        camera: 'Cameras',
        gaming: 'Gaming'
    };

    return (
        <div className="min-h-screen bg-black py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Admin Dashboard
                        </span>
                    </h1>
                    <p className="text-neutral-400 text-lg">Manage your platform content and settings</p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                    </div>
                ) : (
                    <>
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {/* Total DSA Problems */}
                            <div className="bg-gradient-to-br from-blue-900/20 to-blue-600/10 border border-blue-500/30 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <FiDatabase className="text-blue-400 text-2xl" />
                                    <FiTrendingUp className="text-blue-400/50" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-1">{stats.dsa.total}</h3>
                                <p className="text-blue-300 text-sm">Total DSA Problems</p>
                            </div>

                            {/* Easy Problems */}
                            <div className="bg-gradient-to-br from-green-900/20 to-green-600/10 border border-green-500/30 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-green-400 text-2xl">●</span>
                                    <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">Easy</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-1">{stats.dsa.easy}</h3>
                                <p className="text-green-300 text-sm">Easy Problems</p>
                            </div>

                            {/* Medium Problems */}
                            <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-yellow-400 text-2xl">●</span>
                                    <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded">Medium</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-1">{stats.dsa.medium}</h3>
                                <p className="text-yellow-300 text-sm">Medium Problems</p>
                            </div>

                            {/* Hard Problems */}
                            <div className="bg-gradient-to-br from-red-900/20 to-red-600/10 border border-red-500/30 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-red-400 text-2xl">●</span>
                                    <span className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded">Hard</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-1">{stats.dsa.hard}</h3>
                                <p className="text-red-300 text-sm">Hard Problems</p>
                            </div>
                        </div>

                        {/* Tech Products Stats */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <FiShoppingBag className="text-cyan-400" />
                                Tech Products Overview
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Total Products */}
                                <div className="bg-gradient-to-br from-purple-900/20 to-purple-600/10 border border-purple-500/30 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <FiPackage className="text-purple-400 text-2xl" />
                                        <FiTrendingUp className="text-purple-400/50" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-1">{stats.tech.total}</h3>
                                    <p className="text-purple-300 text-sm">Total Products</p>
                                </div>

                                {/* Products by Category */}
                                {Object.entries(stats.tech.byCategory).slice(0, 5).map(([category, count]) => (
                                    <div key={category} className="bg-neutral-900/50 border border-white/10 rounded-lg p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <FiLayers className="text-cyan-400 text-xl" />
                                            <span className="text-xs text-neutral-500 uppercase tracking-wider">{categoryLabels[category] || category}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{count}</h3>
                                        <p className="text-neutral-400 text-sm">Products</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Management Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Manage DSA Problems */}
                            <button
                                onClick={() => navigate('/admin/dsa')}
                                className="group relative bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border border-cyan-500/30 rounded-xl p-8 text-left hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                        <FiDatabase className="text-cyan-400 text-2xl" />
                                    </div>
                                    <FiArrowRight className="text-cyan-400 text-xl opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Manage DSA Problems</h3>
                                <p className="text-neutral-400 text-sm mb-4">Add, edit, and delete DSA problems</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-cyan-400">{stats.dsa.total} Total</span>
                                    <span className="text-neutral-600">•</span>
                                    <span className="text-green-400">{stats.dsa.easy} Easy</span>
                                    <span className="text-yellow-400">{stats.dsa.medium} Medium</span>
                                    <span className="text-red-400">{stats.dsa.hard} Hard</span>
                                </div>
                            </button>

                            {/* Manage Tech Products */}
                            <button
                                onClick={() => navigate('/admin/tech-products')}
                                className="group relative bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-xl p-8 text-left hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                        <FiShoppingBag className="text-purple-400 text-2xl" />
                                    </div>
                                    <FiArrowRight className="text-purple-400 text-xl opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Manage Tech Products</h3>
                                <p className="text-neutral-400 text-sm mb-4">Add, edit, and delete tech products</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-purple-400">{stats.tech.total} Total</span>
                                    <span className="text-neutral-600">•</span>
                                    <span className="text-neutral-400">{Object.keys(stats.tech.byCategory).length} Categories</span>
                                </div>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
