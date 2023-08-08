import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import ProductGrid from './ProductGrid';

export default function User() {

  const [newProduct, setNewProduct] = useState({
    id: null,
    imageUrl: '',
    name: '',
    description: '',
    price: '',
    category: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct(prevState => ({ ...prevState, [name]: value }));
  }

  const [user, setUser] = useState({
    name: "John Doe",
    profileImageUrl: "https://xsgames.co/randomusers/assets/avatars/male/27.jpg"
  });
  const [products, setProducts] = useState([
    {id: 1, imageUrl: 'http://dummy-images.com/objects/dummy-900x900-ToyTruck.jpg', name: 'product 1', description: 'product description', price: '10', category: 'category 1'},
    {id: 2, imageUrl: 'http://dummy-images.com/objects/dummy-900x900-Boxing.jpg', name: 'product 2', description: 'product description', price: '15', category: 'category 2'},
    {id: 3, imageUrl: 'http://dummy-images.com/objects/dummy-900x900-Cup.jpg', name: 'product 3', description: 'product description', price: '20', category: 'category 3'},
    {id: 4, imageUrl: 'http://dummy-images.com/objects/dummy-900x900-Rocker.jpg', name: 'product 4', description: 'product description', price: '21', category: 'category 4'},
    {id: 5, imageUrl: 'http://dummy-images.com/objects/dummy-900x900-Commodore64.jpg', name: 'product 5', description: 'product description', price: '210', category: 'category 5'},
  ]);

  
  const deleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  }

const addProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category) return;
    setProducts(prevProducts => [...prevProducts, { ...newProduct, id: prevProducts.length + 1 }]);
    setNewProduct({
      id: null,
      imageUrl: '',
      name: '',
      description: '',
      price: '',
      category: ''
    });
  }


  // useEffect(() => {
  //   fetchUserData().then(data => setUser(data));
  //   fetchProductsData().then(data => setProducts(data));
  // }, []);

  return (
    <div className="body">
    <UserProfile user={user} />
    
  <div>
    <h4>Add New Product</h4>
    <input type="text" placeholder="Image URL" name="imageUrl" value={newProduct.imageUrl} onChange={handleInputChange} />
    <input type="text" placeholder="Product Name" name="name" value={newProduct.name} onChange={handleInputChange} />
    <input type="text" placeholder="Description" name="description" value={newProduct.description} onChange={handleInputChange} />
    <input type="text" placeholder="Price" name="price" value={newProduct.price} onChange={handleInputChange} />
    <input type="text" placeholder="Category" name="category" value={newProduct.category} onChange={handleInputChange} />
    <button onClick={addProduct}>Add Product</button>
  </div>

<ProductGrid products={products} deleteProduct={deleteProduct} />
</div>
);
}