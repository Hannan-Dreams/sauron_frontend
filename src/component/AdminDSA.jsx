import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Save, X, ArrowLeft } from 'lucide-react';
import { getUser } from '../utils/auth.js';
import { authenticatedFetch } from '../utils/auth.js';
import { API_ENDPOINTS } from '../config/api.js';

export const AdminDSA = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        difficulty: 'Easy',
        level: 'basic',
        link: '',
        description: '',
        tags: '',
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const userData = getUser();
        if (!userData || userData.role !== 'admin') {
            navigate('/');
            return;
        }
        setUser(userData);
        fetchProblems();
    }, [navigate]);

    const fetchProblems = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.DSA.GET_ALL);
            const data = await response.json();
            if (response.ok) {
                setProblems(data.problems || []);
            }
        } catch (error) {
            console.error('Error fetching problems:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            difficulty: 'Easy',
            level: 'basic',
            link: '',
            description: '',
            tags: '',
        });
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        try {
            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
            };

            let response;
            if (editingId) {
                // Update existing problem
                response = await authenticatedFetch(API_ENDPOINTS.DSA.UPDATE(editingId), {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                });
            } else {
                // Create new problem
                response = await authenticatedFetch(API_ENDPOINTS.DSA.CREATE, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                });
            }

            const data = await response.json();

            if (response.ok) {
                setMessage({
                    type: 'success',
                    text: editingId ? 'Problem updated successfully!' : 'Problem created successfully!',
                });
                resetForm();
                fetchProblems();
            } else {
                setMessage({
                    type: 'error',
                    text: data.message || 'Failed to save problem',
                });
            }
        } catch (error) {
            console.error('Error saving problem:', error);
            setMessage({
                type: 'error',
                text: 'Network error. Please try again.',
            });
        }
    };

    const handleEdit = (problem) => {
        setFormData({
            name: problem.name,
            difficulty: problem.difficulty,
            level: problem.level,
            link: problem.link,
            description: problem.description || '',
            tags: problem.tags ? problem.tags.join(', ') : '',
        });
        setEditingId(problem.problemId);
        setShowForm(true);
        setMessage({ type: '', text: '' });
    };

    const handleDelete = async (problemId) => {
        if (!window.confirm('Are you sure you want to delete this problem?')) {
            return;
        }

        try {
            const response = await authenticatedFetch(API_ENDPOINTS.DSA.DELETE(problemId), {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({
                    type: 'success',
                    text: 'Problem deleted successfully!',
                });
                fetchProblems();
            } else {
                setMessage({
                    type: 'error',
                    text: data.message || 'Failed to delete problem',
                });
            }
        } catch (error) {
            console.error('Error deleting problem:', error);
            setMessage({
                type: 'error',
                text: 'Network error. Please try again.',
            });
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black py-20 px-6">
            {/* Background decorative elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group mb-6"
                    >
                        <ArrowLeft size={18} className="transform transition-transform group-hover:-translate-x-1" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </button>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-extrabold mb-3">
                                <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                                    DSA Management
                                </span>
                            </h1>
                            <p className="text-neutral-400 text-lg">
                                Add and manage DSA problems for students
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5"
                        >
                            <Plus size={20} />
                            Add Problem
                        </button>
                    </div>
                </div>

                {/* Message Display */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg border ${message.type === 'success'
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                        }`}>
                        {message.text}
                    </div>
                )}

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <div className="bg-neutral-900 rounded-2xl border border-white/10 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">
                                    {editingId ? 'Edit Problem' : 'Add New Problem'}
                                </h2>
                                <button
                                    onClick={resetForm}
                                    className="text-neutral-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Problem Name */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Problem Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                                        placeholder="Two Sum"
                                    />
                                </div>

                                {/* Difficulty and Level */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
                                            Difficulty *
                                        </label>
                                        <select
                                            name="difficulty"
                                            value={formData.difficulty}
                                            onChange={handleInputChange}
                                            required
                                            style={{ colorScheme: 'dark' }}
                                            className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                                        >
                                            <option value="Easy" className="bg-neutral-800 text-white">Easy</option>
                                            <option value="Medium" className="bg-neutral-800 text-white">Medium</option>
                                            <option value="Hard" className="bg-neutral-800 text-white">Hard</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
                                            Level *
                                        </label>
                                        <select
                                            name="level"
                                            value={formData.level}
                                            onChange={handleInputChange}
                                            required
                                            style={{ colorScheme: 'dark' }}
                                            className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                                        >
                                            <option value="basic" className="bg-neutral-800 text-white">Basic</option>
                                            <option value="medium" className="bg-neutral-800 text-white">Medium</option>
                                            <option value="advanced" className="bg-neutral-800 text-white">Advanced</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Link */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Problem Link *
                                    </label>
                                    <input
                                        type="url"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                                        placeholder="https://leetcode.com/problems/two-sum/"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                                        placeholder="Brief description of the problem..."
                                    />
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Tags (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                                        placeholder="array, hash-table, two-pointers"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
                                    >
                                        <Save size={18} />
                                        {editingId ? 'Update' : 'Create'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Problems List */}
                <div className="bg-neutral-900/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-neutral-400">
                            Loading problems...
                        </div>
                    ) : problems.length === 0 ? (
                        <div className="p-12 text-center text-neutral-400">
                            No problems yet. Click "Add Problem" to create one.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-neutral-900/60 border-b border-neutral-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-500 uppercase tracking-wider">Difficulty</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-500 uppercase tracking-wider">Level</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-500 uppercase tracking-wider">Tags</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-800">
                                    {problems.map((problem) => (
                                        <tr key={problem.problemId} className="hover:bg-neutral-800/40 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-white font-medium">{problem.name}</div>
                                                    {problem.description && (
                                                        <div className="text-sm text-neutral-500 mt-1">{problem.description.substring(0, 60)}...</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${problem.difficulty === 'Easy'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : problem.difficulty === 'Medium'
                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                        : 'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    {problem.difficulty}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-neutral-300 capitalize">{problem.level}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {problem.tags && problem.tags.slice(0, 3).map((tag, idx) => (
                                                        <span key={idx} className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEdit(problem)}
                                                        className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(problem.problemId)}
                                                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-neutral-900/40 backdrop-blur-xl rounded-lg border border-white/10 p-6">
                        <div className="text-3xl font-bold text-white mb-1">{problems.length}</div>
                        <div className="text-sm text-neutral-400">Total Problems</div>
                    </div>
                    <div className="bg-neutral-900/40 backdrop-blur-xl rounded-lg border border-white/10 p-6">
                        <div className="text-3xl font-bold text-green-400 mb-1">
                            {problems.filter(p => p.difficulty === 'Easy').length}
                        </div>
                        <div className="text-sm text-neutral-400">Easy Problems</div>
                    </div>
                    <div className="bg-neutral-900/40 backdrop-blur-xl rounded-lg border border-white/10 p-6">
                        <div className="text-3xl font-bold text-red-400 mb-1">
                            {problems.filter(p => p.difficulty === 'Hard').length}
                        </div>
                        <div className="text-sm text-neutral-400">Hard Problems</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
