import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);

  const handleItemAdded = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleItemUpdated = async (id, updatedItem) => {
    try {
      const response = await axios.put(`http://localhost:3000/items/${id}`, updatedItem);
      setItems(items.map(item => item.id === id ? response.data : item));
    } catch (error) {
      console.error('There was an error updating the item!', error);
    }
  };

  const handleItemDeleted = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/items/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('There was an error deleting the item!', error);
    }
  };

  return (
    <div className="container">
      <h1>Inventory Management</h1>
      <ItemForm onItemAdded={handleItemAdded} />
      <ItemList onItemUpdated={handleItemUpdated} onItemDeleted={handleItemDeleted} />
    </div>
  );
};

export default App;
