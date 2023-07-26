import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/Delete.css';
import { deleteHotel } from '../redux/Delete/deleteSlice';

const DeleteHotel = () => {
  const { isLoading, hotels } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }

  const handleClick = (id) => {
    dispatch(deleteHotel(id));
  };

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
