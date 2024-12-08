import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock the RootNavigator
jest.mock('../src/navigation/RootNavigator', () => {
  return function MockRootNavigator() {
    return <mock-view testID="root-navigator" />;
  };
});

describe('App Component', () => {
  it('renders the navigation container with RootNavigator', () => {
    const { getByTestId } = render(<App />);

    // Check if the NavigationContainer is rendered
    expect(getByTestId('root-navigator')).toBeTruthy();
  });
});
