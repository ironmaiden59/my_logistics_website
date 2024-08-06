import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err.response?.data || err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '', description: '' });
    } catch (err) {
      console.error('Error adding product:', err.response?.data || err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err.response?.data || err.message);
    }
  };

  return (
    <div className="product-management">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
      <form onSubmit={handleAddProduct} className="mb-6">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="block mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="block mb-2 p-2 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="block mb-2 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Add Product
        </button>
      </form>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;