import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = ({ onItemUpdated, onItemDeleted }) => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/items');
        setItems(response.data);
      } catch (error) {
        console.error('There was an error fetching the items!', error);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/items/search?query=${query}`);
      setItems(response.data);
    } catch (error) {
      console.error('There was an error searching the items!', error);
    }
  };

  const handleUpdate = (id) => {
    const name = prompt('Enter new name:');
    const description = prompt('Enter new description:');
    const quantity = prompt('Enter new quantity:');
    if (name && description && quantity) {
      onItemUpdated(id, { name, description, quantity });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onItemDeleted(id);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search items..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">Search</button>
          </div>
        </div>
      </form>
      <h2>Items</h2>
      <div className="row">
        {items.map((item) => (
          <div key={item.id} className="col-md-4 mb-3">
            <div className="card">
              {item.image && <img src={`http://localhost:3000${item.image}`} className="card-img-top" alt={item.name} />}
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
                <button className="btn btn-warning" onClick={() => handleUpdate(item.id)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
