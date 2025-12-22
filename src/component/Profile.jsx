import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Database, Settings, Lock, User, LogOut, ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import { getUser, logout, updateProfile, changePassword, authenticatedFetch } from '../utils/auth';
import { API_ENDPOINTS } from '../config/api';

export const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [message, setMessage] = useState({ type: '', text: '' });

    // Profile form
    const [profileForm, setProfileForm] = useState({ name: '' });
    const [profileLoading, setProfileLoading] = useState(false);

    // Password form
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Admin - Create Admin form
    const [adminForm, setAdminForm] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [adminLoading, setAdminLoading] = useState(false);

    // Admin - DSA Stats
    const [dsaStats, setDsaStats] = useState({ total: 0, easy: 0, medium: 0, hard: 0 });

    useEffect(() => {
        loadUserData();
        if (user?.role === 'admin') {
            loadDSAStats();
        }
    }, [user?.role]);

    const loadUserData = async () => {
        try {
            const userData = getUser();
            if (!userData) {
                navigate('/auth');
                return;
            }

            setUser(userData);
            setProfileForm({ name: userData.name });
            setLoading(false);
        } catch (error) {
            console.error('Error loading user:', error);
            navigate('/auth');
        }
    };

    const loadDSAStats = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.DSA.GET_ALL);
            const data = await response.json();
            if (response.ok) {
                const problems = data.problems || [];
                setDsaStats({
                    total: problems.length,
                    easy: problems.filter(p => p.difficulty === 'Easy').length,
                    medium: problems.filter(p => p.difficulty === 'Medium').length,
                    hard: problems.filter(p => p.difficulty === 'Hard').length,
                });
            }
        } catch (error) {
            console.error('Error loading DSA stats:', error);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setProfileLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const result = await updateProfile(profileForm.name);
            setUser(result.user);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordLoading(true);
        setMessage({ type: '', text: '' });

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            setPasswordLoading(false);
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            setPasswordLoading(false);
            return;
        }

        try {
            await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
            setMessage({ type: 'success', text: 'Password changed successfully!' });
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to change password' });
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        setAdminLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await authenticatedFetch(API_ENDPOINTS.AUTH.CREATE_ADMIN, {
                method: 'POST',
                body: JSON.stringify(adminForm),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: `Admin user "${adminForm.name}" created successfully!` });
                setAdminForm({ email: '', password: '', name: '' });
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to create admin' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to create admin' });
        } finally {
            setAdminLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/auth');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    const isAdmin = user?.role === 'admin';

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black py-20 px-6">
            {/* Background decorative elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group mb-8"
                >
                    <ArrowLeft size={18} className="transform transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-medium">Back to Home</span>
                </button>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
                        <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                            {isAdmin ? 'Admin Dashboard' : 'My Profile'}
                        </span>
                    </h1>
                    <p className="text-neutral-400 text-lg">
                        {isAdmin ? 'Manage your account and platform settings' : 'Manage your account settings and preferences'}
                    </p>
                </div>

                {/* User Info Card */}
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center text-white text-3xl font-bold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                                    {isAdmin && (
                                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                            <Shield size={12} />
                                            ADMIN
                                        </span>
                                    )}
                                </div>
                                <p className="text-neutral-400">{user?.email}</p>
                                <p className="text-sm text-neutral-500 mt-1">
                                    Member since {new Date(user?.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full sm:w-auto px-6 py-3 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg font-medium transition-all duration-300 hover:bg-red-600/30 hover:border-red-500/50 flex items-center justify-center gap-2"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>



                {/* Admin Dashboard Button (Admin Only) */}
                {isAdmin && (
                    <div className="mb-8">
                        <button
                            onClick={() => navigate('/admin')}
                            className="w-full bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/30 rounded-xl p-8 text-left hover:border-cyan-500/50 transition-all group hover:shadow-xl hover:shadow-cyan-500/20"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                        <Shield className="text-cyan-400" size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h3>
                                        <p className="text-neutral-400 text-sm">Manage platform content and settings</p>
                                    </div>
                                </div>
                                <ArrowLeft className="text-cyan-400 transform rotate-180 group-hover:translate-x-2 transition-transform" size={24} />
                            </div>
                            <div className="flex items-center gap-6 text-sm pt-4 border-t border-white/10">
                                <div className="flex items-center gap-2">
                                    <Database className="text-blue-400" size={16} />
                                    <span className="text-neutral-400">DSA Problems:</span>
                                    <span className="text-white font-semibold">{dsaStats.total}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Settings className="text-purple-400" size={16} />
                                    <span className="text-neutral-400">Tech Products</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="text-green-400" size={16} />
                                    <span className="text-neutral-400">User Management</span>
                                </div>
                            </div>
                        </button>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'profile'
                            ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white'
                            : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                            }`}
                    >
                        <User size={18} />
                        Profile Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'security'
                            ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white'
                            : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                            }`}
                    >
                        <Lock size={18} />
                        Security
                    </button>
                    {isAdmin && (
                        <button
                            onClick={() => setActiveTab('create-admin')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'create-admin'
                                ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white'
                                : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                                }`}
                        >
                            <Shield size={18} />
                            Create Admin
                        </button>
                    )}
                </div>

                {/* Message Display */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg border ${message.type === 'success'
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                        }`}>
                        <div className="flex items-center gap-2">
                            {message.type === 'success' ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )}
                            <span className="text-sm font-medium">{message.text}</span>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                    {activeTab === 'profile' && (
                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={profileForm.name}
                                    onChange={(e) => setProfileForm({ name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={user?.email}
                                    disabled
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-neutral-500 cursor-not-allowed"
                                />
                                <p className="text-xs text-neutral-500 mt-1">Email cannot be changed</p>
                            </div>

                            {isAdmin && (
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Role
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <span className="px-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-purple-300 font-medium flex items-center gap-2">
                                            <Shield size={16} />
                                            Administrator
                                        </span>
                                    </div>
                                    <p className="text-xs text-neutral-500 mt-1">You have full access to all platform features</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={profileLoading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {profileLoading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </form>
                    )}

                    {activeTab === 'security' && (
                        <form onSubmit={handlePasswordChange} className="space-y-6">
                            <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-300 mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-300 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-300 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={passwordLoading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {passwordLoading ? 'Changing...' : 'Change Password'}
                            </button>
                        </form>
                    )}

                    {activeTab === 'create-admin' && isAdmin && (
                        <div>
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">Create New Administrator</h3>
                                <p className="text-neutral-400 text-sm">Add a new admin user who will have full access to all platform features.</p>
                            </div>

                            <form onSubmit={handleCreateAdmin} className="space-y-6">
                                <div>
                                    <label htmlFor="adminName" className="block text-sm font-medium text-neutral-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="adminName"
                                        value={adminForm.name}
                                        onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                                        placeholder="Jane Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="adminEmail" className="block text-sm font-medium text-neutral-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="adminEmail"
                                        value={adminForm.email}
                                        onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                                        placeholder="admin@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="adminPassword" className="block text-sm font-medium text-neutral-300 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="adminPassword"
                                        value={adminForm.password}
                                        onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                                        required
                                        minLength={6}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                                        placeholder="••••••••"
                                    />
                                    <p className="text-xs text-neutral-500 mt-1">Minimum 6 characters</p>
                                </div>

                                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Shield className="text-purple-400 mt-0.5" size={20} />
                                        <div>
                                            <h4 className="text-sm font-semibold text-purple-300 mb-1">Admin Privileges</h4>
                                            <p className="text-xs text-neutral-400">This user will have full administrative access including:</p>
                                            <ul className="text-xs text-neutral-400 mt-2 space-y-1 list-disc list-inside">
                                                <li>Manage DSA problems</li>
                                                <li>Create other admin users</li>
                                                <li>Full platform access</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={adminLoading}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <Shield size={18} />
                                    {adminLoading ? 'Creating Admin...' : 'Create Admin User'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
