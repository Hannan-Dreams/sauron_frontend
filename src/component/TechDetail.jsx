import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import { FilterPanel } from './FilterPanel';
import { USD_TO_INR } from '../utils/constants';

export const TechDetail = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Filter states
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [sortBy, setSortBy] = useState('');

    const ratingOptions = [
        { value: 4, label: '4★ & above' },
        { value: 3, label: '3★ & above' },
        { value: 2, label: '2★ & above' },
        { value: 1, label: '1★ & above' },
    ];

    // Category metadata - minimalist
    const categoryData = {
        mobile: {
            title: "Mobile Phones",
            icon: "📱",
        },
        laptop: {
            title: "Laptops",
            icon: "💻",
        },
        keyboard: {
            title: "Keyboards",
            icon: "⌨️",
        },
        mouse: {
            title: "Mouse",
            icon: "🖱️",
        },
        headphones: {
            title: "Headphones",
            icon: "🎧",
        },
        monitor: {
            title: "Monitors",
            icon: "🖥️",
        },
        smartwatch: {
            title: "Smartwatches",
            icon: "⌚",
        },
        tablet: {
            title: "Tablets",
            icon: "📲",
        }
    };

    const currentCategory = categoryData[category] || categoryData.mobile;

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`http://localhost:3000/api/tech-products/category/${category}`);
            const data = await response.json();

            if (data.success) {
                setProducts(data.data);
            } else {
                setError(data.message || 'Failed to fetch products');
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Get unique brands from products
    const availableBrands = [...new Set(products.map(p => p.brand))].filter(Boolean).sort();

    // Filter products based on selected filters
    const getFilteredProducts = () => {
        let filtered = [...products];

        // Brand filter
        if (selectedBrands.length > 0) {
            filtered = filtered.filter(p => selectedBrands.includes(p.brand));
        }

        // Price range filter (works on INR)
        if (priceRange.min || priceRange.max) {
            filtered = filtered.filter(p => {
                const priceUSD = parseFloat(p.price.replace(/[^0-9.]/g, ''));
                const priceINR = priceUSD * USD_TO_INR;
                const min = priceRange.min ? parseFloat(priceRange.min) : 0;
                const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
                return priceINR >= min && priceINR <= max;
            });
        }

        // Rating filter
        if (selectedRatings.length > 0) {
            const minRating = Math.min(...selectedRatings);
            filtered = filtered.filter(p => (p.rating || 0) >= minRating);
        }

        // Sort
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => {
                const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
                const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
                return priceA - priceB;
            });
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => {
                const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
                const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
                return priceB - priceA;
            });
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortBy === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        return filtered;
    };

    const filteredProducts = getFilteredProducts();

    const toggleBrand = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const toggleRating = (rating) => {
        setSelectedRatings(prev =>
            prev.includes(rating)
                ? prev.filter(r => r !== rating)
                : [...prev, rating]
        );
    };

    const clearAllFilters = () => {
        setSelectedBrands([]);
        setPriceRange({ min: '', max: '' });
        setSelectedRatings([]);
        setSortBy('');
    };

    const hasActiveFilters = selectedBrands.length > 0 ||
        priceRange.min || priceRange.max || selectedRatings.length > 0;

    if (loading) {
        return (
            <div className='min-h-screen bg-neutral-950 py-20 px-6 flex items-center justify-center'>
                <div className="text-neutral-400 text-lg">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='min-h-screen bg-neutral-950 py-20 px-6'>
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-2xl font-light text-white mb-3">Error Loading Products</h1>
                    <p className="text-neutral-500 mb-8 text-sm">{error}</p>
                    <button
                        onClick={() => navigate('/tech')}
                        className="px-6 py-2.5 bg-white text-black text-sm font-medium transition-all duration-300 hover:bg-neutral-200"
                    >
                        Back to Categories
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-neutral-950 pt-14'>
            {/* Filter Panel Modal */}
            <FilterPanel
                isOpen={showMobileFilters}
                onClose={() => setShowMobileFilters(false)}
                selectedCategories={[]}
                selectedBrands={selectedBrands}
                priceRange={priceRange}
                selectedRatings={selectedRatings}
                toggleCategory={() => { }}
                toggleBrand={toggleBrand}
                toggleRating={toggleRating}
                setPriceRange={setPriceRange}
                clearAllFilters={clearAllFilters}
                categories={[]}
                availableBrands={availableBrands}
                ratingOptions={ratingOptions}
                showCategoryFilter={false}
                hasActiveFilters={hasActiveFilters}
            />

            {/* Header */}
            <div className="border-b border-white/10 bg-gradient-to-b from-neutral-900/80 to-neutral-900/50 sticky top-14 z-30 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <button
                                onClick={() => navigate('/tech')}
                                className="flex items-center gap-2 text-neutral-500 hover:text-cyan-400 transition-colors text-sm group"
                            >
                                <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path>
                                </svg>
                                <span>Back to Categories</span>
                            </button>
                        </div>
                    </div>

                    {/* Filter and Sort Bar */}
                    <div className="flex items-center gap-3">
                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-48 px-4 py-2.5 bg-neutral-800/80 backdrop-blur-sm border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 cursor-pointer transition-all"
                        >
                            <option value="">Sort By: Default</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Customer Rating</option>
                            <option value="name">Name: A to Z</option>
                        </select>

                        {/* Filter Button */}
                        <button
                            onClick={() => setShowMobileFilters(true)}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 text-white rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
                        >
                            <FaFilter className="w-4 h-4" />
                            <span className="text-sm font-medium">Filters</span>
                            {hasActiveFilters && (
                                <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs rounded-full font-semibold">
                                    {selectedBrands.length + selectedRatings.length + (priceRange.min || priceRange.max ? 1 : 0)}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-5xl mb-4 opacity-20">📦</div>
                        <h2 className="text-xl font-light text-white mb-2">No Products Found</h2>
                        <p className="text-neutral-500 mb-8 text-sm">
                            {hasActiveFilters
                                ? 'Try adjusting your filters to see more results'
                                : 'Check back later for new products'}
                        </p>
                        {hasActiveFilters ? (
                            <button
                                onClick={clearAllFilters}
                                className="px-6 py-2.5 bg-white text-black text-sm font-medium transition-all duration-300 hover:bg-neutral-200"
                            >
                                Clear All Filters
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/tech')}
                                className="px-6 py-2.5 bg-white text-black text-sm font-medium transition-all duration-300 hover:bg-neutral-200"
                            >
                                Browse Other Categories
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.productId}
                                onClick={() => navigate(`/tech/${category}/${product.productId}`)}
                                className="group relative bg-neutral-900/30 border border-white/5 overflow-hidden cursor-pointer hover:border-white/10 transition-all duration-300"
                            >
                                {/* Product Image */}
                                <div className="relative h-56 bg-white/5 flex items-center justify-center overflow-hidden">
                                    {product.imageUrl ? (
                                        <img
                                            src={`http://localhost:3000${product.imageUrl}`}
                                            alt={product.name}
                                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = `<div class="text-6xl opacity-20">${currentCategory.icon}</div>`;
                                            }}
                                        />
                                    ) : (
                                        <div className="text-6xl opacity-20">{currentCategory.icon}</div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-5">
                                    {/* Brand */}
                                    <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
                                        {product.brand}
                                    </p>

                                    {/* Product Name */}
                                    <h3 className="text-base font-light text-white mb-3 line-clamp-2 group-hover:text-neutral-300 transition-colors">
                                        {product.name}
                                    </h3>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? 'text-white' : 'text-neutral-700'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-xs text-neutral-500">{product.rating || 'N/A'}</span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            {(() => {
                                                const priceStr = product.price || '';
                                                const numericPrice = parseFloat(priceStr.replace(/[^0-9.]/g, ''));

                                                if (!isNaN(numericPrice) && numericPrice > 0) {
                                                    const inrPrice = numericPrice * USD_TO_INR;
                                                    return (
                                                        <>
                                                            <span className="text-lg font-light text-white block">
                                                                ${numericPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                                                            </span>
                                                            <span className="text-xs text-neutral-500 block mt-1">
                                                                ≈ ₹{inrPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                                            </span>
                                                        </>
                                                    );
                                                }
                                                return <span className="text-lg font-light text-white">{product.price}</span>;
                                            })()}
                                        </div>
                                        <span className="text-xs text-neutral-500 group-hover:text-white transition-colors">
                                            View →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
