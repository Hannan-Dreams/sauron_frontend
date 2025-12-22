import React from 'react';
import { FaTimes } from 'react-icons/fa';

export const FilterPanel = ({
    isOpen,
    onClose,
    // Filter states
    selectedCategories,
    selectedBrands,
    priceRange,
    selectedRatings,
    // Filter handlers
    toggleCategory,
    toggleBrand,
    toggleRating,
    setPriceRange,
    clearAllFilters,
    // Data
    categories,
    availableBrands,
    ratingOptions,
    // Options
    showCategoryFilter = true,
    hasActiveFilters = false
}) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={onClose}
            ></div>

            {/* Filter Panel */}
            <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-neutral-900 border-l border-white/10 z-50 overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-neutral-900 border-b border-white/10 p-4 flex items-center justify-between z-10">
                    <h2 className="text-lg font-semibold text-white">Filters</h2>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Filter Content */}
                <div className="p-4 space-y-6">
                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                            <span className="text-sm font-medium text-white">Active Filters</span>
                            <button
                                onClick={clearAllFilters}
                                className="text-xs text-cyan-400 hover:text-cyan-300 uppercase tracking-wider font-semibold transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                    )}

                    {/* Category Filter */}
                    {showCategoryFilter && categories && (
                        <div className="pb-6 border-b border-white/10">
                            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Category</h3>
                            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                {categories.map(category => (
                                    <label key={category.value} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category.value)}
                                            onChange={() => toggleCategory(category.value)}
                                            className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                                        />
                                        <span className="text-sm text-neutral-400 group-hover:text-white transition-colors flex items-center gap-2">
                                            <span>{category.icon}</span>
                                            <span>{category.label}</span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Brand Filter */}
                    {availableBrands && availableBrands.length > 0 && (
                        <div className="pb-6 border-b border-white/10">
                            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Brand</h3>
                            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                {availableBrands.map(brand => (
                                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => toggleBrand(brand)}
                                            className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                                        />
                                        <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">
                                            {brand}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Rating Filter */}
                    {ratingOptions && (
                        <div className="pb-6 border-b border-white/10">
                            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Customer Rating</h3>
                            <div className="space-y-2">
                                {ratingOptions.map(option => (
                                    <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedRatings.includes(option.value)}
                                            onChange={() => toggleRating(option.value)}
                                            className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                                        />
                                        <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">
                                            {option.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Price Range Filter */}
                    <div className="pb-6 border-b border-white/10">
                        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Price Range</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                    className="w-full px-3 py-2 bg-neutral-800 border border-white/10 rounded text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                                />
                                <span className="text-neutral-500">-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                    className="w-full px-3 py-2 bg-neutral-800 border border-white/10 rounded text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {[10000, 25000, 50000, 100000].map(price => (
                                    <button
                                        key={price}
                                        onClick={() => setPriceRange({ min: '', max: price.toString() })}
                                        className="px-3 py-2 text-xs bg-neutral-800 border border-white/10 rounded text-neutral-400 hover:text-white hover:border-cyan-500 transition-colors"
                                    >
                                        Under ₹{price / 1000}k
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                    >
                        Apply Filters
                    </button>
                </div>

                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 3px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 3px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: rgba(255, 255, 255, 0.3);
                    }
                `}</style>
            </div>
        </>
    );
};
