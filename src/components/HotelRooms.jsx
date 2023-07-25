import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchhotels } from '../redux/Home/homeSlice';
import styles from '../styles/Home.module.css';

const CustomPrevButton = ({ onClick }) => (
  <button
    type="button"
    className={`${styles.carouselButton} ${styles.carouselButtonnext}`}
    onClick={onClick}
  >
    <BiRightArrow className={styles.svgicon} />
  </button>
);

CustomPrevButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const CustomNextButton = ({ onClick }) => (
  <button
    type="button"
    className={`${styles.carouselButton} ${styles.carouselButtonprev}`}
    onClick={onClick}
  >
    <BiLeftArrow className={styles.svgicon} />
  </button>
);

CustomNextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const HotelRooms = () => {
  const { fetched, isLoading, hotels } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchhotels());
    }
  }, [dispatch, fetched]); // Added itemsToShow here

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <CustomPrevButton />,
    prevArrow: <CustomNextButton />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

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
          <Slider
            className={styles.slider}
            dots={settings.dots}
            infinite={settings.infinite}
            speed={settings.speed}
            slidesToShow={settings.slidesToShow}
            slidesToScroll={settings.slidesToScroll}
            nextArrow={settings.nextArrow}
            prevArrow={settings.prevArrow}
            responsive={settings.responsive}
          >
            {hotels.map((hotel) => (
              <div key={hotel.id}>
                <Link to={`/details/${hotel.id}`} className={styles.hotelinfo}>
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
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default HotelRooms;
