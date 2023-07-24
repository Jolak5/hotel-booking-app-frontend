import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchHotel } from '../redux/Details/detailsSlice';
import styles from './Details.module.css';

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
    <div className={styles.details}>
      <div className={styles.divimg}>
        {hoteldetails.image && <img className={styles.detailsimg} src={hoteldetails.image.url} alt={hoteldetails.name} />}
      </div>
      <div className={styles.divdetails}>
        <h3>{hoteldetails.name}</h3>
        <table className={styles.detailstable}>
          <tr className={styles.divtr}>
            <td> Hotel price</td>
            <td> {hoteldetails.price} </td>
          </tr>
          <tr className={styles.divtr}>
            <td> Duration </td>
            <td> {hoteldetails.duration} </td>
          </tr>
        </table>
        <button className={styles.reserve}> Reserve </button>
      </div>
    </div>
  );
};

export default Details;
