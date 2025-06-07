import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [userForm, setUserForm] = useState({ name: "", email: "" });
  const [productForm, setProductForm] = useState({ name: "", price: "" });

  // Replace with your backend API URL
  const API_URL = "http://localhost:8000";

  // Fetch users
  const fetchUsers = async () => {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();
    setUsers(data);
  };

  // Fetch products
  const fetchProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  // Handle form input change
  const handleUserChange = (e) =>
    setUserForm({ ...userForm, [e.target.name]: e.target.value });

  const handleProductChange = (e) =>
    setProductForm({ ...productForm, [e.target.name]: e.target.value });

  // Add new user
  const addUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userForm),
    });
    if (res.ok) {
      setUserForm({ name: "", email: "" });
      fetchUsers();
    } else {
      alert("Error adding user");
    }
  };

  // Add new product
  const addProduct = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/products/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: productForm.name, price: Number(productForm.price) }),
    });
    if (res.ok) {
      setProductForm({ name: "", price: "" });
      fetchProducts();
    } else {
      alert("Error adding product");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Users</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} ({u.email})</li>
        ))}
      </ul>
      <form onSubmit={addUser}>
        <input
          name="name"
          placeholder="Name"
          value={userForm.name}
          onChange={handleUserChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={userForm.email}
          onChange={handleUserChange}
          required
          type="email"
        />
        <button type="submit">Add User</button>
      </form>

      <hr />

      <h1>Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
      <form onSubmit={addProduct}>
        <input
          name="name"
          placeholder="Product Name"
          value={productForm.name}
          onChange={handleProductChange}
          required
        />
        <input
          name="price"
          placeholder="Price"
          value={productForm.price}
          onChange={handleProductChange}
          required
          type="number"
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default App;
