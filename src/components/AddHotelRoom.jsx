import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createHotel } from '../redux/newhotel/newhotelSlice';

function AddHotelForm() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHotel = {
      name, description, duration, price, image,
    };
    dispatch(createHotel(newHotel));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input type="file" onChange={handleFileChange} />
      <button type="submit">Add Hotel</button>
    </form>
  );
}

export default AddHotelForm;
