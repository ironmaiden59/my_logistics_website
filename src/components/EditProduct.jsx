import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    images: [] // Initialize images as an empty array
  });
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const productData = response.data;
        
        // Ensure images is always an array
        if (!productData.images) {
          productData.images = [];
        }
        
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err.response?.data || err.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewImages(e.target.files);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      Array.from(newImages).forEach((file) => {
        formData.append('images', file);
      });

      await axios.put(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/products'); // Redirect to product management page
    } catch (err) {
      console.error('Error saving product changes:', err.response?.data || err.message);
    }
  };

  return (
    <div className="edit-product container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSaveChanges} className="mb-6 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {product.images.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Current Images
            </label>
            <div className="flex flex-wrap mt-1">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/${image}`}
                  alt={`Product ${product.name} - Image ${index + 1}`}
                  className="w-24 h-24 object-cover mr-2 mb-2 rounded"
                />
              ))}
            </div>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Add Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;