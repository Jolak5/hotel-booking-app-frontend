import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import HotelRooms from '../components/HotelRooms';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Home', () => {
    const initialState = {
        home: {
            fetched: true,
            isLoading: false,
            hotels: [
                {
                    "id": 1,
                    "name": "Hotel 1",
                    "description": "This is a description for Hotel 1.",
                    "duration": 4,
                    "price": "431.9",
                    "image": {
                        "url": "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--70dd5f31c81314bc4a67fa2c2c0698786debcc95/image1.jpg"
                    }
                },
            ],
        },
    };

    const store = mockStore(initialState);

    test('renders without crashing', () => {
        const { getAllByText } = render(
            <Provider store={store}>
                <Router>
                    <HotelRooms />
                </Router>
            </Provider>,
        );
        const elements = getAllByText('Hotel 1');
        expect(elements.length).toBeGreaterThan(0);
    });


    test('matches snapshot', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Router>
                        <HotelRooms />
                    </Router>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});