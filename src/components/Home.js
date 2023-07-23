import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchhotels } from '../redux/Home/homeSlice';

const Home = () => {
  const {
    fetched, isLoading, hotels,
  } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchhotels());
    }
  }, [dispatch, fetched]);

  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <>
      <div>
        <h1>Hotels</h1>
        <div>
          {hotels.map((hotel) => (
            <Link key={hotel.id} to={`/details/${hotel.id}`}>
              <div key={hotel.id}>
                <h2>{hotel.name}</h2>
                <p>
                  {hotel.description}
                </p>
                <p>
                  {hotel.price}
                </p>
                <p>
                  {hotel.duration}
                </p>
                <img src={hotel.image.url} alt="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
