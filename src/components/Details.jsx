import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaGreaterThan } from 'react-icons/fa';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchHotel } from '../redux/Details/detailsSlice';
import styles from '../styles/Details.module.css';

const Details = () => {
  const { id } = useParams();
  const { isLoading, hoteldetails } = useSelector((state) => state.details);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClick = () => {
    const hotelDetails = hoteldetails;

    navigate('/reservations/new', {
      state: {
        hotel: hotelDetails,
        directAccess: false,
      },
    });
  };

  useEffect(() => {
    dispatch(fetchHotel(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <p className={styles.loadingText}>Loading...</p>;
  }
  return (
    <div className={styles.details}>
      {hoteldetails.image && (
        <img
          className={styles.detimg}
          src={hoteldetails.image.url}
          alt={hoteldetails.name}
        />
      )}
      <div className={styles.hoteltextdetails}>
        <div className={styles.detailer}>
          <h2 className={styles.hoteldetailsname}>{hoteldetails.name}</h2>
          <p className={styles.hoteldetailsdescription}>
            {hoteldetails.description}
          </p>
          <div className={styles.hotelpricecontainer}>
            <p className={styles.textheading}>Price Per Night</p>
            <span className="price-value">
              $
              {hoteldetails.price}
            </span>
          </div>
          <div className={styles.durationcontainer}>
            <p className={styles.textheading}>Duration</p>
            <span className="duration-value">
              {hoteldetails.duration}
              days
            </span>
          </div>
        </div>
        <div className={styles.links}>
          <Link to="/home" className={styles.morehotelslink}>
            Discover More Hotel Rooms
            <FaGreaterThan />
          </Link>
          <button
            type="submit"
            onClick={handleClick}
            className={styles.reserve}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
