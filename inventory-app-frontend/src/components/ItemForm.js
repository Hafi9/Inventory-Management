import React, { useState } from 'react';
import axios from 'axios';

const ItemForm = ({ onItemAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('quantity', quantity);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:3000/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onItemAdded(response.data);
      setName('');
      setDescription('');
      setQuantity('');
      setImage(null);
    } catch (error) {
      console.error('There was an error adding the item!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label>Name:</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      </div>
      <div className="form-group">
        <label>Quantity:</label>
        <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Image:</label>
        <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <button type="submit" className="btn btn-primary">Add Item</button>
    </form>
  );
};

export default ItemForm;
