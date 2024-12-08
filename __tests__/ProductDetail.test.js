import React from 'react';
import { render } from '@testing-library/react-native';
import ProductDetail from '../src/screens/ProductDetail';

describe('ProductDetail Component', () => {
  const mockProduct = {
    title: 'Test Product',
    description: 'This is a test description.',
    price: 99.99,
    image: 'https://via.placeholder.com/150',
  };

  const mockRoute = { params: { product: mockProduct } };

  it('renders the product image', () => {
    const { getByTestId } = render(<ProductDetail route={mockRoute} />);
    const image = getByTestId('product-image');
    expect(image.props.source.uri).toBe(mockProduct.image);
  });

  it('renders the product title', () => {
    const { getByText } = render(<ProductDetail route={mockRoute} />);
    expect(getByText(mockProduct.title)).toBeTruthy();
  });

  it('renders the product description', () => {
    const { getByText } = render(<ProductDetail route={mockRoute} />);
    expect(getByText(mockProduct.description)).toBeTruthy();
  });

  it('renders the product price', () => {
    const { getByText } = render(<ProductDetail route={mockRoute} />);
    expect(getByText(`$${mockProduct.price}`)).toBeTruthy();
  });
});
