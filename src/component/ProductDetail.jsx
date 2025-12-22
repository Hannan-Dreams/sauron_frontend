import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { USD_TO_INR } from '../utils/constants';

export const ProductDetail = () => {
    const { category, productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Category metadata - minimalist color scheme
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
            title: "Gaming Mice",
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
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`http://localhost:3000/api/tech-products/${productId}`);
            const data = await response.json();

            if (data.success) {
                setProduct(data.data);
            } else {
                setError(data.message || 'Product not found');
            }
        } catch (err) {
            console.error('Error fetching product:', err);
            setError('Failed to load product. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className='min-h-screen bg-black py-20 px-6 flex items-center justify-center'>
                <div className="text-neutral-400 text-lg">Loading...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className='min-h-screen bg-black py-20 px-6 flex items-center justify-center'>
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-light text-white mb-3">Product Not Found</h1>
                    <p className="text-neutral-500 mb-8 text-sm">{error || 'The product you are looking for does not exist.'}</p>
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
        <div className='min-h-screen bg-black py-16 px-6'>
            {/* Back Button */}
            <div className="max-w-7xl mx-auto mb-12">
                <button
                    onClick={() => navigate(`/tech/${category}`)}
                    className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors duration-300 text-sm group"
                >
                    <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    <span>Back to {currentCategory.title}</span>
                </button>
            </div>

            {/* Product Detail Section */}
            <div className="max-w-7xl mx-auto">
                {/* Top Section: Image + Info */}
                <div className="grid md:grid-cols-2 gap-16 mb-20">
                    {/* Left: Image */}
                    <div className="flex items-center justify-center bg-neutral-900/30 border border-white/5 p-12">
                        {product.imageUrl ? (
                            <img
                                src={`http://localhost:3000${product.imageUrl}`}
                                alt={product.name}
                                className="w-full h-auto object-contain max-h-[500px]"
                            />
                        ) : (
                            <div className="text-9xl opacity-10">{currentCategory.icon}</div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col justify-center space-y-8">
                        {/* Brand */}
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">{product.brand}</p>

                            {/* Product Name */}
                            <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                                {product.name}
                            </h1>

                            {/* Description */}
                            {product.description && (
                                <p className="text-neutral-400 text-sm leading-relaxed">
                                    {product.description}
                                </p>
                            )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'text-white' : 'text-neutral-800'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-neutral-500">{product.rating || 'N/A'} / 5.0</span>
                        </div>

                        {/* Price */}
                        <div className="border-t border-white/5 pt-6">
                            <p className="text-xs text-neutral-500 mb-3">Price</p>
                            {(() => {
                                // Extract numeric value from price string
                                const priceStr = product.price || '';
                                const numericPrice = parseFloat(priceStr.replace(/[^0-9.]/g, ''));

                                if (!isNaN(numericPrice) && numericPrice > 0) {
                                    const inrPrice = numericPrice * USD_TO_INR;

                                    return (
                                        <div className="mb-6">
                                            {/* USD Price */}
                                            <p className="text-4xl font-light text-white mb-2">
                                                ${numericPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                                            </p>
                                            {/* INR Price */}
                                            <p className="text-xl font-light text-neutral-400">
                                                ≈ ₹{inrPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                            </p>
                                        </div>
                                    );
                                }

                                // Fallback if price can't be parsed
                                return (
                                    <p className="text-4xl font-light text-white mb-6">{product.price}</p>
                                );
                            })()}

                            {/* Affiliate Link Button */}
                            {product.affiliateLink && (
                                <a
                                    href={product.affiliateLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-8 py-3.5 bg-white text-black text-sm font-medium transition-all duration-300 hover:bg-neutral-200"
                                >
                                    View on Amazon →
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Specifications */}
                {product.specs && product.specs.length > 0 && (
                    <div>
                        <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">SPECIFICATIONS</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {product.specs.map((spec, idx) => {
                                // Parse spec into label and value
                                const colonIndex = spec.indexOf(':');
                                const label = colonIndex > -1 ? spec.substring(0, colonIndex).trim() : spec;
                                const value = colonIndex > -1 ? spec.substring(colonIndex + 1).trim() : '';

                                return (
                                    <div key={idx}>
                                        <p className="text-sm text-white mb-0.5">{label}</p>
                                        {value && <p className="text-sm text-neutral-500">{value}</p>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
