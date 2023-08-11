import React, { useState, useEffect } from 'react';
import UserCard from './UserCard.js';
import ProductGrid from './ProductGrid';
import './UserProduct.css';
import { getDatabase, ref, push, remove, onValue, orderByChild, query, equalTo } from 'firebase/database';

export default function User({uid}) {
  const [newProduct, setNewProduct] = useState({
    id: null,
    imageUrl: '',
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const [user, setUser] = useState({
    name: 'John Doe',
    profileImageUrl:
      'https://xsgames.co/randomusers/assets/avatars/male/27.jpg',
  });
  const [products, setProducts] = useState([
    {
      id: 1,
      imageUrl: 'http://dummy-images.com/objects/dummy-900x900-ToyTruck.jpg',
      name: 'product 1',
      description: 'product description',
      price: '10',
      category: 'category 1',
    },
    {
      id: 2,
      imageUrl: 'http://dummy-images.com/objects/dummy-900x900-Boxing.jpg',
      name: 'product 2',
      description: 'product description',
      price: '15',
      category: 'category 2',
    },
    {
      id: 3,
      imageUrl: 'http://dummy-images.com/objects/dummy-900x900-Cup.jpg',
      name: 'product 3',
      description: 'product description',
      price: '20',
      category: 'category 3',
    },
    {
      id: 4,
      imageUrl: 'http://dummy-images.com/objects/dummy-900x900-Rocker.jpg',
      name: 'product 4',
      description: 'product description',
      price: '21',
      category: 'category 4',
    },
    {
      id: 5,
      imageUrl: 'http://dummy-images.com/objects/dummy-900x900-Commodore64.jpg',
      name: 'product 5',
      description: 'product description',
      price: '210',
      category: 'category 5',
    },
  ]);

  const addProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.category
    )
      return;

    const database = getDatabase();
    const productsRef = ref(database, 'Products');

    const newProductData = {
      imageUrl: newProduct.imageUrl,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
      location: newProduct.location,
      userId: uid,
    };

    push(productsRef, newProductData);

    setNewProduct({
      id: null,
      imageUrl: '',
      name: '',
      description: '',
      price: '',
      category: '',
    });
  };

  const deleteProduct = (productId) => {
    const database = getDatabase();
    const productRef = ref(database, `Products/${productId}`); // 'products' is the name of your database node

    remove(productRef);
  };

  useEffect(() => {
    const database = getDatabase();
    const productsRef = query(ref(database, 'Products'), orderByChild('userId'), equalTo(uid)); // 'products' is the name of your database node
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data ? Object.values(data) : [];
      setProducts(productsArray);
    });

    return () => {
      // Unsubscribe from the database listener when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <div className="body">
      {/* <UserCard user={user} /> */}

      <div>
        <div className="add-product-section">
          <h4 className="add-product-title">Add New Product</h4>
          <input
            className="input-product-image-url"
            type="text"
            placeholder="Image URL"
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={handleInputChange}
          />
          <input
            className="input-product-name"
            type="text"
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <input
            className="input-product-description"
            type="text"
            placeholder="Description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <input
            className="input-product-price"
            type="text"
            placeholder="Price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <input
            className="input-product-category"
            type="text"
            placeholder="Category"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
          />
          <input
            className="input-product-location"
            type="text"
            placeholder="Location (e.g., 48.86, 2.3522)"
            name="location"
            value={newProduct.location}
            onChange={handleInputChange}
          />
          {/* might need to link with user uid? */}
          <button className="add-product-btn" onClick={addProduct}>
            Add Product
          </button>
        </div>
      </div>

      <ProductGrid products={products} deleteProduct={deleteProduct} />
    </div>
  );
}
