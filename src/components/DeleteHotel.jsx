import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Delete.css';

const DeleteHotel = () => {
  const { isLoading, hotels } = useSelector((state) => state.home);

  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }

  const handleClick = (id) => {
    
  }

  return (
    <>
      <div className="main-del-container">
        {hotels.map((hotel) => (
          <div className="delete-container" key={hotel.id}>
            <img className="delete-image" src={hotel.image.url} alt={hotel.name} />
            <h3 className="delete-name">{hotel.name}</h3>
            <button type="submit" onClick={handleClick(hotel.id)} className="delete-button">
                DELETE
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default DeleteHotel;
