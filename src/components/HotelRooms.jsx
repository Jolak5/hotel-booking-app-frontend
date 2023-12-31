import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useLocation } from 'react-router-dom';
import { fetchhotels } from '../redux/Home/homeSlice';
import styles from '../styles/Home.module.css';

const HotelRooms = () => {
  const { fetched, isLoading, hotels } = useSelector((state) => state.home);
  const location = useLocation();
  const dispatch = useDispatch();

  const { directAcess } = location.state || {};
  const [itemsToShow, setItemsToShow] = useState(
    Math.min(window.innerWidth > 768 ? 3 : 1, hotels.length),
  );

  const handleResize = useCallback(() => {
    setItemsToShow(Math.min(window.innerWidth > 768 ? 3 : 1, hotels.length));
  }, [hotels.length]);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchhotels());
    }
    setItemsToShow(Math.min(window.innerWidth > 768 ? 3 : 1, hotels.length));
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, fetched, hotels, handleResize]);

  useEffect(() => {
    if (!directAcess) {
      dispatch(fetchhotels());
    }
  }, [dispatch, directAcess]);

  if (isLoading) {
    return <p className={styles.loadingText}>Loading...</p>;
  }

  if (hotels.length === 0) {
    return (
      <p className={styles.noHotelsText}>
        There are no Hotels. Please add a hotel
      </p>
    );
  }

  const truncateDescription = (description, words = 4) => {
    const wordArray = description.trim().split(' ');
    const truncated = wordArray.slice(0, words).join(' ');
    return wordArray.length > words ? `${truncated}...` : truncated;
  };

  return (
    <>
      <div className={styles.homediv}>
        <h1 className={styles.hoteltitle}>Hotel Rooms</h1>
        <h3 className={styles.hotelsubtitle}>Please select a model</h3>
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
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className={`${styles.carouselButton} ${styles.prev}`}
            >
              <BiLeftArrow className={styles.svgicon} />
            </button>
            )}
            renderArrowNext={(onClickHandler, hasNext, label) => hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className={`${styles.carouselButton} ${styles.next}`}
            >
              <BiRightArrow className={styles.svgicon} />
            </button>
            )}
          >
            {hotels.map((hotel) => (
              <div key={hotel.id}>
                <Link to={`/details/${hotel.id}`} className={styles.hotelinfo}>
                  <img
                    className={styles.hotelimg}
                    src={hotel.image.url}
                    alt={hotel.name}
                  />
                  <h3 className={styles.hotelname}>{hotel.name}</h3>
                  <div className={styles.dotedbordercontainer} />
                  <p className={styles.hotelDesc}>
                    {truncateDescription(hotel.description)}
                  </p>
                  <div className={styles.hotelicons}>
                    <FaFacebook className={styles.hotelicon} />
                    <FaTwitter className={styles.hotelicon} />
                    <AiOutlineMail className={styles.hotelicon} />
                  </div>
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
