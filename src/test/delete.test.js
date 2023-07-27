import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DeleteHotel from '../components/DeleteHotel';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('DeleteHotel', () => {
  const initialState = {
    home: {
      isLoading: false,
      hotels: [
        {
          id: 1,
          name: 'Hotel 1',
          image: {
            url: 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--16d773ef08a1a413ca00a961f9b8696c29001642/image1.jpg',
          },
        },
      ],
    },
  };

  const store = mockStore(initialState);

  test('matches snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DeleteHotel />
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
