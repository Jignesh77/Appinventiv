import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DashboardScreen from '../src/screens/DashboardScreen';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));
jest.mock('react-native-swiper', () => {
  const { View } = require('react-native');
  return View; 
});
const mockNavigation = { navigate: jest.fn() };
const mockAxios = new MockAdapter(axios);

const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 39.99,
    image: 'https://via.placeholder.com/150',
  },
];

describe('DashboardScreen Component', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('renders the loading indicator initially', () => {
    const { getByTestId } = render(<DashboardScreen navigation={mockNavigation} />);
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('displays the featured products in a swiper', async () => {
    mockAxios.onGet('https://fakestoreapi.com/products').reply(200, mockProducts);

    const { getByText, getAllByTestId } = render(
      <DashboardScreen navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText('Product 1')).toBeTruthy();
    });

    const featuredProducts = getAllByTestId('swiper-image');
    expect(featuredProducts).toHaveLength(2); // Two featured products displayed
  });

  it('renders the product list', async () => {
    mockAxios.onGet('https://fakestoreapi.com/products').reply(200, mockProducts);

    const { getByText } = render(<DashboardScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(getByText('Product 1')).toBeTruthy();
      expect(getByText('Product 2')).toBeTruthy();
    });
  });

  it('navigates to the Detail screen when a product is selected', async () => {
    mockAxios.onGet('https://fakestoreapi.com/products').reply(200, mockProducts);

    const { getByText } = render(<DashboardScreen navigation={mockNavigation} />);

    await waitFor(() => {
      fireEvent.press(getByText('Product 1'));
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Detail', {
      product: mockProducts[0],
    });
  });

  it('handles API errors gracefully', async () => {
    mockAxios.onGet('https://fakestoreapi.com/products').reply(500);

    const { getByText } = render(<DashboardScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(getByText('Error fetching products:')).toBeTruthy();
    });
  });
});
