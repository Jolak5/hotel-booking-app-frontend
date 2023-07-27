import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router';
import { fetchreservations } from '../redux/reservation/reservation';
import styles from '../styles/Home.module.css';

const ReservationsList = () => {
  const { fetched, isLoading, reservations } = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  const location = useLocation;
  const { directAcess } = location.state || {};

  const [itemsToShow, setItemsToShow] = useState(
    Math.min(window.innerWidth > 768 ? 3 : 1, reservations.length),
  );

  const handleResize = useCallback(() => {
    setItemsToShow(Math.min(window.innerWidth > 768 ? 3 : 1, reservations.length));
  }, [reservations.length]);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchreservations());
    }

    setItemsToShow(Math.min(window.innerWidth > 768 ? 3 : 1, reservations.length));
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, fetched, reservations, handleResize]);

  useEffect(() => {
    if (!directAcess) {
      dispatch(fetchreservations());
    }
  }, [dispatch, directAcess]);
  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div className={styles.homediv}>
      <h1 className={styles.hoteltitle}>Your reservations</h1>
      <h3 className={styles.hotelsubtitle}>Here you can easily check all your reservations</h3>
      <div className={styles.dotedbordercontainer} />
      <div className={styles.hoteldiv}>
        <Carousel
          showThumbs={false}
          emulateTouch
          dynamicHeight={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop
          useKeyboardArrows
          centerMode
          centerSlidePercentage={100 / itemsToShow}
          renderArrowPrev={(onClickHandler, hasPrev, label) => hasPrev && (
          <button type="button" onClick={onClickHandler} title={label} className={`${styles.carouselButton} ${styles.prev}`}>
            <BiLeftArrow className={styles.svgicon} />
          </button>
          )}
          renderArrowNext={(onClickHandler, hasNext, label) => hasNext && (
          <button type="button" onClick={onClickHandler} title={label} className={`${styles.carouselButton} ${styles.next}`}>
            <BiRightArrow className={styles.svgicon} />
          </button>
          )}
        >

          {reservations && reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div key={reservation.id}>
                <img
                  className={styles.hotelimg}
                  src={reservation.hotel.image.url}
                  alt={reservation.hotel.name}
                />
                <h1 className={styles.hotelname}>{reservation.hotel.name}</h1>
                <p className={styles.hotelDesc}>{reservation.reservation_date}</p>
                <p>{reservation.duration}</p>
                <div className={styles.hotelicons}>
                  <FaFacebook className={styles.hotelicon} />
                  <FaTwitter className={styles.hotelicon} />
                  <AiOutlineMail className={styles.hotelicon} />
                </div>

              </div>

            ))
          ) : (
            <p>It is empty</p>
          )}

        </Carousel>
        {' '}

      </div>
    </div>

  );
};

export default ReservationsList;
