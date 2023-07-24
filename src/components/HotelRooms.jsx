import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchhotels } from '../redux/Home/homeSlice';
import styles from './Home.module.css';

const HotelRooms = () => {
  const { fetched, isLoading, hotels } = useSelector((state) => state.home);
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
      <div className={styles.homediv}>
        <h1>Hotels</h1>
        <h3>Please select a model</h3>
        <div className={styles.hoteldiv}>
          {hotels.map((hotel) => (
            <Link key={hotel.id} to={`/details/${hotel.id}`}>
              <div key={hotel.id} className={styles.hotelinfo}>
                <img className={styles.hotelimg} src={hotel.image.url} alt="true" />
                <h5 className={styles.removemargin}>{hotel.name}</h5>
                <p className={styles.hotelDesc}>
                  {hotel.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HotelRooms;
