import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaFacebook, FaTwitter,
} from 'react-icons/fa';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Carousel from 'nuka-carousel';
import { fetchhotels } from '../redux/Home/homeSlice';
import styles from '../styles/Home.module.css';

const HotelRooms = () => {
  const { fetched, isLoading, hotels } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const getSlidesToShow = () => {
    const width = window.innerWidth;

    if (width > 768) {
      return 3;
    }
    return 1;
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchhotels());
    }
    const handleResize = () => setSlidesToShow(getSlidesToShow());
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, fetched]);

  if (isLoading) {
    return (
      <p>Loading...</p>
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
            slidesToShow={slidesToShow}
            renderCenterLeftControls={({ previousSlide }) => (
              <button type="button" className={`${styles.carouselButton} ${styles.carouselButtonprev}`} onClick={previousSlide}>
                <BiLeftArrow className={styles.svgicon} />
              </button>
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <button type="button" className={`${styles.carouselButton} ${styles.carouselButtonnext}`} onClick={nextSlide}>
                <BiRightArrow className={styles.svgicon} />
              </button>
            )}
            renderBottomCenterControls={null}
          >
            {hotels.map((hotel) => (
              <Link key={hotel.id} to={`/details/${hotel.id}`} className={styles.hotelinfo}>
                <img className={styles.hotelimg} src={hotel.image.url} alt={hotel.name} />
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
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default HotelRooms;
