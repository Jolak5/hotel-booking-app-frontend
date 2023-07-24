import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { fetchhotels } from '../redux/Home/homeSlice';
import styles from './Home.module.css';

const HotelRooms = () => {
  const { fetched, isLoading, hotels } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const [itemsToShow, setItemsToShow] = useState(window.innerWidth > 768 ? 3 : 1);

  const handleResize = () => {
    setItemsToShow(window.innerWidth > 768 ? 3 : 1);
  };

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchhotels());
    }

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
          <Carousel showThumbs={false} emulateTouch dynamicHeight={false} showStatus={false} showIndicators={false} showArrows={true} infiniteLoop useKeyboardArrows centerMode centerSlidePercentage={100 / itemsToShow}>
            {hotels.map((hotel) => (
              <div key={hotel.id}>
                <Link to={`/details/${hotel.id}`} className={styles.hotelinfo}>
                  <img className={styles.hotelimg} src={hotel.image.url} alt={hotel.name} />
                  <h5 className={styles.removemargin}>{hotel.name}</h5>
                  <p className={styles.hotelDesc}>
                    {hotel.description}
                  </p>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default HotelRooms;
