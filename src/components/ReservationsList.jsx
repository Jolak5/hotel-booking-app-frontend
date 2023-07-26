import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router';
import { fetchreservations } from '../redux/reservation/reservation';
import styles from '../styles/Home.module.css';

export default function ReservationsList() {
  const { fetched, isLoading, reservations } = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  const location = useLocation;
  const { directacess } = location.state || {};
  const [itemsToShow, setItemsToShow] = useState(window.innerWidth > 768 ? 3 : 1);
  const handleResize = () => {
    setItemsToShow(window.innerWidth > 768 ? 3 : 1);
  };
  useEffect(() => {
    if (!fetched) {
      dispatch(fetchreservations());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, fetched]);

  useEffect(() => {
    if (!directacess) {
      dispatch(fetchreservations());
    }
  }, [dispatch, directacess]);
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
}
