import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { Routes, Route, MemoryRouter } from 'react-router-dom';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Details from '../components/Details';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Details', () => {
  const initialState = {
    details: {
      fetched: true,
      isLoading: false,
      hoteldetails: {
        id: 2,
        name: 'Hotel 2',
        description: 'This is a description for Hotel 2.',
        duration: 7,
        price: '139.13',
        image: {
          url: 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--16d773ef08a1a413ca00a961f9b8696c29001642/image2.jpg',
        },
      },
    },
  };

  const store = mockStore(initialState);
  const hotelId = '2';

  test('renders without crashing', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${hotelId}`]}>
          <Routes>
            <Route path="/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    expect(getByText('Hotel 2')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${hotelId}`]}>
          <Routes>
            <Route path="/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
