import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, getUser } from '../utils/auth';

export const AdminTechProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: 'mobile',
        price: '',
        rating: '',
        description: '',
        affiliateLink: '',
        specs: [{ label: '', value: '' }],
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);

    const categories = [
        { value: 'mobile', label: 'Mobile Phones' },
        { value: 'laptop', label: 'Laptops' },
        { value: 'keyboard', label: 'Keyboards' },
        { value: 'mouse', label: 'Gaming Mice' },
        { value: 'headphones', label: 'Headphones' },
        { value: 'monitor', label: 'Monitors' },
        { value: 'smartwatch', label: 'Smartwatches' },
        { value: 'tablet', label: 'Tablets' },
    ];

    useEffect(() => {
        const user = getUser();
        if (!user) {
            navigate('/auth');
            return;
        }
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/tech-products');
            const data = await response.json();
            if (data.success) {
                setProducts(data.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSpecChange = (index, field, value) => {
        const newSpecs = [...formData.specs];
        newSpecs[index][field] = value;
        setFormData(prev => ({ ...prev, specs: newSpecs }));
    };

    const addSpec = () => {
        setFormData(prev => ({
            ...prev,
            specs: [...prev.specs, { label: '', value: '' }]
        }));
    };

    const removeSpec = (index) => {
        const newSpecs = formData.specs.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, specs: newSpecs }));
    };

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newSpecs = [...formData.specs];
        const draggedItem = newSpecs[draggedIndex];
        newSpecs.splice(draggedIndex, 1);
        newSpecs.splice(index, 0, draggedItem);

        setFormData(prev => ({ ...prev, specs: newSpecs }));
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = getAccessToken();
        if (!token) {
            alert('Please login to continue');
            navigate('/auth');
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('brand', formData.brand);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('rating', formData.rating || '0');
            formDataToSend.append('description', formData.description);
            formDataToSend.append('affiliateLink', formData.affiliateLink || '');

            // Convert specs to the format: ["Main Camera: 50MP", "Front Camera: 20MP"]
            const specsArray = formData.specs
                .filter(s => s.label.trim() && s.value.trim())
                .map(s => `${s.label}: ${s.value}`);
            formDataToSend.append('specs', JSON.stringify(specsArray));

            if (imageFile) {
                formDataToSend.append('image', imageFile);
            }

            const url = editingProduct
                ? `http://localhost:3000/api/tech-products/${editingProduct.productId}`
                : 'http://localhost:3000/api/tech-products';

            const method = editingProduct ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            const data = await response.json();

            if (data.success) {
                alert(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
                resetForm();
                fetchProducts();
            } else {
                alert(data.message || 'Failed to save product');
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);

        // Parse specs back to label-value format
        const parsedSpecs = product.specs.map(spec => {
            const colonIndex = spec.indexOf(':');
            if (colonIndex > -1) {
                return {
                    label: spec.substring(0, colonIndex).trim(),
                    value: spec.substring(colonIndex + 1).trim()
                };
            }
            return { label: spec, value: '' };
        });

        setFormData({
            name: product.name,
            brand: product.brand,
            category: product.category,
            price: product.price,
            rating: product.rating?.toString() || '',
            description: product.description || '',
            affiliateLink: product.affiliateLink || '',
            specs: parsedSpecs.length > 0 ? parsedSpecs : [{ label: '', value: '' }],
        });
        setImagePreview(product.imageUrl ? `http://localhost:3000${product.imageUrl}` : null);
        setShowForm(true);
    };

    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        const token = getAccessToken();
        try {
            const response = await fetch(`http://localhost:3000/api/tech-products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (data.success) {
                alert('Product deleted successfully!');
                fetchProducts();
            } else {
                alert(data.message || 'Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            brand: '',
            category: 'mobile',
            price: '',
            rating: '',
            description: '',
            affiliateLink: '',
            specs: [{ label: '', value: '' }],
        });
        setImageFile(null);
        setImagePreview(null);
        setEditingProduct(null);
        setShowForm(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-light text-white mb-2">Tech Products Admin</h1>
                        <p className="text-neutral-500 text-sm">Manage your tech product catalog</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-6 py-2.5 bg-white text-black text-sm font-medium transition-all duration-300 hover:bg-neutral-200"
                    >
                        {showForm ? 'Cancel' : '+ Add Product'}
                    </button>
                </div>

                {/* Form */}
                {showForm && (
                    <div className="bg-neutral-900/30 border border-white/5 p-8 mb-8">
                        <h2 className="text-2xl font-light text-white mb-6">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Product Name */}
                                <div>
                                    <label className="block text-white mb-2 text-sm">Product Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/20"
                                        placeholder="iPhone 15 Pro Max"
                                    />
                                </div>

                                {/* Brand */}
                                <div>
                                    <label className="block text-white mb-2 text-sm">Brand *</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/20"
                                        placeholder="Apple"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-white mb-2 text-sm">Category *</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/20 [&>option]:bg-neutral-900 [&>option]:text-white"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.value} value={cat.value} className="bg-neutral-900 text-white">{cat.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-white mb-2 text-sm">Price *</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/20"
                                        placeholder="$1,199"
                                    />
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="block text-white mb-2 text-sm">Rating (0-5)</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/20"
                                        placeholder="4.9"
                                    />
                                </div>

                                {/* Affiliate Link */}
                                <div>
                                    <label className="block text-white mb-2 text-sm">Affiliate Link</label>
                                    <input
                                        type="url"
                                        name="affiliateLink"
                                        value={formData.affiliateLink}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/20 overflow-hidden text-ellipsis"
                                        placeholder="https://amazon.com/..."
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-white mb-2 text-sm">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/20 resize-none break-words"
                                    placeholder="Product description..."
                                />
                            </div>

                            {/* Specifications - Dynamic with Drag & Drop */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="block text-white text-sm">Specifications (Drag to reorder)</label>
                                    <button
                                        type="button"
                                        onClick={addSpec}
                                        className="px-4 py-2 bg-cyan-600/20 text-cyan-400 text-sm border border-cyan-500/30 rounded transition-all duration-300 hover:bg-cyan-600/30 hover:border-cyan-500/50"
                                    >
                                        + Add Spec
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.specs.map((spec, index) => (
                                        <div
                                            key={index}
                                            draggable
                                            onDragStart={() => handleDragStart(index)}
                                            onDragOver={(e) => handleDragOver(e, index)}
                                            onDragEnd={handleDragEnd}
                                            className={`flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 items-center p-3 bg-white/5 border border-white/10 cursor-move transition-all ${draggedIndex === index ? 'opacity-50' : ''
                                                }`}
                                        >
                                            <div className="text-neutral-500 shrink-0">☰</div>
                                            <input
                                                type="text"
                                                value={spec.label}
                                                onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                                                className="flex-1 min-w-[120px] px-3 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/20 text-sm"
                                                placeholder="Main Camera"
                                            />
                                            <input
                                                type="text"
                                                value={spec.value}
                                                onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                                className="flex-1 min-w-[100px] px-3 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/20 text-sm"
                                                placeholder="50MP"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeSpec(index)}
                                                className="shrink-0 px-3 py-2 bg-red-600/20 text-red-400 text-sm border border-red-600/30 rounded transition-all duration-300 hover:bg-red-600/30"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-white mb-2 text-sm">Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/20"
                                />
                                {imagePreview && (
                                    <div className="mt-4">
                                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover" />
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-white text-black text-sm font-medium transition-all duration-300 hover:bg-neutral-200"
                                >
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </button>
                                {editingProduct && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-8 py-3 bg-neutral-700 text-white text-sm font-medium transition-all duration-300 hover:bg-neutral-600"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                )}

                {/* Products List */}
                <div className="bg-neutral-900/30 border border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5">
                        <h2 className="text-2xl font-light text-white">All Products ({products.length})</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="px-6 py-4 text-left text-white text-sm font-medium">Image</th>
                                    <th className="px-6 py-4 text-left text-white text-sm font-medium">Name</th>
                                    <th className="px-6 py-4 text-left text-white text-sm font-medium">Brand</th>
                                    <th className="px-6 py-4 text-left text-white text-sm font-medium">Category</th>
                                    <th className="px-6 py-4 text-left text-white text-sm font-medium">Price</th>
                                    <th className="px-6 py-4 text-left text-white text-sm font-medium">Rating</th>
                                    <th className="px-6 py-4 text-left text-white text-sm font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.productId} className="border-t border-white/5 hover:bg-white/5">
                                        <td className="px-6 py-4">
                                            {product.imageUrl ? (
                                                <img src={`http://localhost:3000${product.imageUrl}`} alt={product.name} className="w-16 h-16 object-cover" />
                                            ) : (
                                                <div className="w-16 h-16 bg-white/10 flex items-center justify-center text-2xl">
                                                    📦
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-white text-sm">{product.name}</td>
                                        <td className="px-6 py-4 text-neutral-400 text-sm">{product.brand}</td>
                                        <td className="px-6 py-4 text-neutral-400 text-sm">{product.category}</td>
                                        <td className="px-6 py-4 text-white text-sm">{product.price}</td>
                                        <td className="px-6 py-4 text-neutral-400 text-sm">⭐ {product.rating || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="px-4 py-2 bg-white/10 text-white text-sm border border-white/10 transition-all duration-300 hover:bg-white/20"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.productId)}
                                                    className="px-4 py-2 bg-red-600/20 text-red-400 text-sm border border-red-600/30 transition-all duration-300 hover:bg-red-600/30"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {products.length === 0 && (
                            <div className="p-12 text-center text-neutral-500 text-sm">
                                No products found. Add your first product to get started!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
