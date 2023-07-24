import axios from 'axios';
import { getLocalStorage } from '../helpers/localStorage';

const postDataToApi = async () => {
  const data = {
    user_id: 1,
    hotel_id: 1,
    reservation_date: '13/12/1995',
  };

  try {
    const token = getLocalStorage('token');

    const response = await axios.post('http://localhost:3000/reservations', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default postDataToApi;
