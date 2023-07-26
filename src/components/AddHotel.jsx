import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createHotel } from '../redux/hotel/newhotelSlice';
import '../styles/AddHotel.css';

const AddHotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(null);
  const [price, setPrice] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHotel = {
      name,
      description,
      duration,
      price,
      image,
    };
    dispatch(createHotel(newHotel));
    navigate('/home', {
      state: {
        directAccess: false,
      },
    });
  };

  return (
    <div className="add-hotel-container">
      <div className="add-hotel-headings-container">
        <h2 className="add-hotel-heading">Add Hotel Room</h2>
        <p className="add-hotel-text">
          Show off your hotel&apos;s breathtaking views and top-notch service
        </p>
      </div>
      <form action="submt" className="add-hotel-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="text-input input"
          placeholder="Hotel Room Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          required
        />
        <textarea
          className="input-description input"
          placeholder="Description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
        <div className="number-inputs-container">
          <input
            type="number"
            className="number-input input"
            placeholder="Standard Duration"
            name="duration"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            required
          />
          <input
            type="number"
            className="number-input input"
            placeholder="Price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </div>
        <div className="image-container">
          <input
            type="file"
            className="image-input"
            onChange={handleFileChange}
            required
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ maxWidth: '200px', marginTop: '10px' }}
            />
          )}
        </div>
        <button type="submit" className="add-hotel-btn">
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
