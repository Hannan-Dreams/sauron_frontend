import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ExternalLink, CheckCircle2, Circle, ArrowLeft, Filter, X } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api.js';
import { authenticatedFetch, isAuthenticated } from '../utils/auth.js';

export const DSATable = () => {
    const { level } = useParams();
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [solvedProblems, setSolvedProblems] = useState(new Set());
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [progressLoading, setProgressLoading] = useState(false);

    const levelConfig = {
        all: {
            title: "All DSA Problems",
            gradient: "from-purple-500 via-blue-500 to-cyan-500",
            icon: "📚",
        },
        basic: {
            title: "Basic DSA Problems",
            gradient: "from-green-500 to-emerald-600",
            icon: "📚",
        },
        medium: {
            title: "Medium DSA Problems",
            gradient: "from-yellow-500 to-orange-600",
            icon: "🎯",
        },
        advanced: {
            title: "Advanced DSA Problems",
            gradient: "from-red-500 to-pink-600",
            icon: "🚀",
        }
    };

    const data = levelConfig[level];

    useEffect(() => {
        fetchProblems();
        if (isAuthenticated()) {
            loadUserProgress();
        } else {
            loadLocalProgress();
        }
    }, [level]);

    useEffect(() => {
        filterProblems();
    }, [problems, selectedTags]);

    const fetchProblems = async () => {
        setLoading(true);
        try {
            // Fetch all problems if level is 'all', otherwise fetch by level
            const endpoint = level === 'all'
                ? API_ENDPOINTS.DSA.GET_ALL
                : API_ENDPOINTS.DSA.GET_BY_LEVEL(level);

            const response = await fetch(endpoint);
            const result = await response.json();

            if (response.ok) {
                setProblems(result.problems || []);
                extractTags(result.problems || []);
            } else {
                console.error('Failed to fetch problems:', result.message);
                setProblems([]);
            }
        } catch (error) {
            console.error('Error fetching problems:', error);
            setProblems([]);
        } finally {
            setLoading(false);
        }
    };

    const loadUserProgress = async () => {
        try {
            const response = await authenticatedFetch(API_ENDPOINTS.PROGRESS.GET);
            const result = await response.json();

            if (response.ok) {
                if (level === 'all') {
                    // For 'all' level, combine solved problems from all levels
                    const allSolved = new Set();
                    const progressByLevel = result.progress?.progressByLevel || {};
                    Object.values(progressByLevel).forEach(levelData => {
                        (levelData.solved || []).forEach(id => allSolved.add(id));
                    });
                    setSolvedProblems(allSolved);
                } else {
                    const solvedIds = result.progress?.progressByLevel?.[level]?.solved || [];
                    setSolvedProblems(new Set(solvedIds));
                }
            }
        } catch (error) {
            console.error('Error loading progress:', error);
            // Fallback to localStorage if API fails
            loadLocalProgress();
        }
    };

    const loadLocalProgress = () => {
        if (level === 'all') {
            // For 'all' level, combine solved problems from all levels
            const allSolved = new Set();
            ['basic', 'medium', 'advanced'].forEach(lvl => {
                const saved = localStorage.getItem(`solved_${lvl}`);
                if (saved) {
                    JSON.parse(saved).forEach(id => allSolved.add(id));
                }
            });
            setSolvedProblems(allSolved);
        } else {
            const saved = localStorage.getItem(`solved_${level}`);
            if (saved) {
                setSolvedProblems(new Set(JSON.parse(saved)));
            }
        }
    };

    const extractTags = (problemList) => {
        const tagsSet = new Set();
        problemList.forEach(problem => {
            if (problem.tags && Array.isArray(problem.tags)) {
                problem.tags.forEach(tag => tagsSet.add(tag));
            }
        });
        setAvailableTags(Array.from(tagsSet).sort());
    };

    const filterProblems = () => {
        if (selectedTags.length === 0) {
            setFilteredProblems(problems);
        } else {
            const filtered = problems.filter(problem => {
                if (!problem.tags || !Array.isArray(problem.tags)) return false;
                return selectedTags.every(tag => problem.tags.includes(tag));
            });
            setFilteredProblems(filtered);
        }
    };

    const toggleSolved = async (problemId, problemLevel) => {
        const isSolved = solvedProblems.has(problemId);

        // Optimistic update
        const newSolved = new Set(solvedProblems);
        if (isSolved) {
            newSolved.delete(problemId);
        } else {
            newSolved.add(problemId);
        }
        setSolvedProblems(newSolved);

        // Determine which level to use for saving
        const saveLevel = level === 'all' ? problemLevel : level;

        // Save to backend if authenticated
        if (isAuthenticated()) {
            setProgressLoading(true);
            try {
                const endpoint = isSolved
                    ? API_ENDPOINTS.PROGRESS.UNSOLVE
                    : API_ENDPOINTS.PROGRESS.SOLVE;

                const response = await authenticatedFetch(endpoint, {
                    method: 'POST',
                    body: JSON.stringify({ problemId, level: saveLevel }),
                });

                if (!response.ok) {
                    // Revert on error
                    setSolvedProblems(solvedProblems);
                    console.error('Failed to update progress');
                }
            } catch (error) {
                // Revert on error
                setSolvedProblems(solvedProblems);
                console.error('Error updating progress:', error);
            } finally {
                setProgressLoading(false);
            }
        } else {
            // Save to localStorage if not authenticated
            if (level === 'all') {
                // Update the specific level's localStorage
                const saved = localStorage.getItem(`solved_${saveLevel}`);
                const levelSolved = saved ? new Set(JSON.parse(saved)) : new Set();
                if (isSolved) {
                    levelSolved.delete(problemId);
                } else {
                    levelSolved.add(problemId);
                }
                localStorage.setItem(`solved_${saveLevel}`, JSON.stringify(Array.from(levelSolved)));
            } else {
                localStorage.setItem(`solved_${level}`, JSON.stringify(Array.from(newSolved)));
            }
        }
    };

    const toggleTag = (tag) => {
        setSelectedTags(prev => {
            if (prev.includes(tag)) {
                return prev.filter(t => t !== tag);
            } else {
                return [...prev, tag];
            }
        });
    };

    const clearFilters = () => {
        setSelectedTags([]);
    };

    if (!data) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-6xl mb-4 text-white">404</h1>
                    <p className="text-neutral-400 mb-6">Level not found</p>
                    <Link to="/code/dsa" className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-all">
                        Back to DSA
                    </Link>
                </div>
            </div>
        );
    }

    const solvedCount = solvedProblems.size;
    const totalProblems = filteredProblems.length;
    const progress = totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;

    return (
        <div className="min-h-screen bg-black py-20 px-6">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto mb-8">
                <button
                    onClick={() => navigate('/code/dsa')}
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft size={18} className="transform transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-medium">Back to DSA</span>
                </button>
            </div>

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl">{data.icon}</span>
                    <div>
                        <h1 className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${data.gradient} bg-clip-text text-transparent mb-2`}>
                            {data.title}
                        </h1>
                        <p className="text-neutral-400 text-lg">
                            {loading ? 'Loading problems...' : `${totalProblems} problem${totalProblems !== 1 ? 's' : ''} available`}
                            {!isAuthenticated() && (
                                <span className="ml-2 text-yellow-500 text-sm">
                                    (Login to sync progress)
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Login Banner for Non-Authenticated Users */}
                {!isAuthenticated() && (
                    <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                    <Circle className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Track Your Progress</h3>
                                    <p className="text-neutral-400 text-sm">Login to save your progress and sync across devices</p>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/auth')}
                                className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                            >
                                Login Now
                            </button>
                        </div>
                    </div>
                )}

                {/* Progress Bar */}
                <div className="bg-neutral-900/40 backdrop-blur-sm rounded-lg border border-neutral-800 p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-neutral-400">Progress</span>
                        <span className="text-sm font-bold text-white">{solvedCount} / {totalProblems} solved</span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
                        <div
                            className={`h-full bg-gradient-to-r ${data.gradient} transition-all duration-500 rounded-full`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            {availableTags.length > 0 && (
                <div className="max-w-7xl mx-auto mb-8">
                    <div className="bg-neutral-900/40 backdrop-blur-sm rounded-lg border border-neutral-800 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Filter size={20} className="text-cyan-400" />
                                <h3 className="text-lg font-semibold text-white">Filter by Tags</h3>
                            </div>
                            {selectedTags.length > 0 && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors"
                                >
                                    <X size={16} />
                                    Clear Filters
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {availableTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedTags.includes(tag)
                                        ? 'bg-cyan-500 text-white'
                                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                        {selectedTags.length > 0 && (
                            <div className="mt-3 text-sm text-neutral-400">
                                Showing problems with: <span className="text-cyan-400">{selectedTags.join(', ')}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Problems Table */}
            <div className="max-w-7xl mx-auto">
                <div className="bg-neutral-900/40 backdrop-blur-sm rounded-lg border border-neutral-800 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-neutral-400">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mb-4"></div>
                            <p>Loading problems...</p>
                        </div>
                    ) : filteredProblems.length === 0 ? (
                        <div className="p-12 text-center text-neutral-400">
                            {selectedTags.length > 0 ? (
                                <>
                                    <p className="mb-4">No problems found with the selected tags.</p>
                                    <button
                                        onClick={clearFilters}
                                        className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </>
                            ) : (
                                <p>No problems available for this level yet.</p>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-neutral-900/60 border-b border-neutral-800">
                                <div className="col-span-1 text-sm font-semibold text-neutral-500 uppercase tracking-wider">Status</div>
                                <div className="col-span-1 text-sm font-semibold text-neutral-500 uppercase tracking-wider">#</div>
                                <div className="col-span-5 text-sm font-semibold text-neutral-500 uppercase tracking-wider">Problem</div>
                                <div className="col-span-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">Difficulty</div>
                                <div className="col-span-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">Tags</div>
                                <div className="col-span-1 text-sm font-semibold text-neutral-500 uppercase tracking-wider">Link</div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-neutral-800">
                                {filteredProblems.map((problem, index) => {
                                    const isSolved = solvedProblems.has(problem.problemId);
                                    return (
                                        <div
                                            key={problem.problemId}
                                            className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-neutral-800/40 transition-colors group"
                                        >
                                            {/* Status Checkbox */}
                                            <div className="col-span-1 flex items-center">
                                                {isAuthenticated() ? (
                                                    <button
                                                        onClick={() => toggleSolved(problem.problemId, problem.level)}
                                                        disabled={progressLoading}
                                                        className="transition-all duration-300 disabled:opacity-50"
                                                        title="Mark as solved"
                                                    >
                                                        {isSolved ? (
                                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                        ) : (
                                                            <Circle className="w-5 h-5 text-neutral-600 hover:text-neutral-400" />
                                                        )}
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => navigate('/auth')}
                                                        className="transition-all duration-300 cursor-pointer group relative"
                                                        title="Login to track progress"
                                                    >
                                                        <Circle className="w-5 h-5 text-neutral-700 group-hover:text-cyan-500" />
                                                        <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-neutral-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-neutral-700">
                                                            Login to track progress →
                                                        </div>
                                                    </button>
                                                )}
                                            </div>

                                            {/* Problem Number */}
                                            <div className="col-span-1 flex items-center">
                                                <span className="text-neutral-500 font-medium">{index + 1}</span>
                                            </div>

                                            {/* Problem Name */}
                                            <div className="col-span-5 flex flex-col justify-center">
                                                <span className={`font-medium transition-colors ${isSolved ? 'text-neutral-500 line-through' : 'text-white'}`}>
                                                    {problem.name}
                                                </span>
                                                {problem.description && (
                                                    <span className="text-xs text-neutral-500 mt-1">{problem.description.substring(0, 80)}...</span>
                                                )}
                                            </div>

                                            {/* Difficulty Badge */}
                                            <div className="col-span-2 flex items-center">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${problem.difficulty === 'Easy'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : problem.difficulty === 'Medium'
                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                        : 'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    {problem.difficulty}
                                                </span>
                                            </div>

                                            {/* Tags */}
                                            <div className="col-span-2 flex items-center">
                                                <div className="flex flex-wrap gap-1">
                                                    {problem.tags && problem.tags.slice(0, 2).map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={`px-2 py-0.5 text-xs rounded ${selectedTags.includes(tag)
                                                                ? 'bg-cyan-500/30 text-cyan-300'
                                                                : 'bg-neutral-700 text-neutral-400'
                                                                }`}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {problem.tags && problem.tags.length > 2 && (
                                                        <span className="px-2 py-0.5 text-xs bg-neutral-700 text-neutral-400 rounded">
                                                            +{problem.tags.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Link */}
                                            <div className="col-span-1 flex items-center">
                                                <a
                                                    href={problem.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-neutral-500 hover:text-white transition-colors"
                                                >
                                                    <ExternalLink size={18} />
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
