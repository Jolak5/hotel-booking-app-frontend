import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchHotel } from '../redux/Details/detailsSlice';

const Details = () => {
  const { id } = useParams();
  const { isLoading, hoteldetails } = useSelector((state) => state.details);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHotel(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }
  return (
    <div>
      <h1>Details</h1>
      <div>
        <h2>{hoteldetails.name}</h2>
        <p>
          {hoteldetails.description}
        </p>
        <p>
          {hoteldetails.price}
        </p>
        <p>
          {hoteldetails.duration}
        </p>
        {hoteldetails.image && <img src={hoteldetails.image.url} alt={hoteldetails.name} />}
      </div>
    </div>
  );
};

export default Details;
