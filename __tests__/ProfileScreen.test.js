import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen from '../src/screens/ProfileScreen'; 

describe('ProfileScreen Component', () => {
  it('renders the Profile text', () => {
    const { getByText } = render(<ProfileScreen />);
    const profileText = getByText('Profile');
    expect(profileText).toBeTruthy();
  });

  it('applies correct styles to the container', () => {
    const { getByTestId } = render(<ProfileScreen />);
    const container = getByTestId('container');
    expect(container.props.style).toMatchObject({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    });
  });

  it('applies correct styles to the text', () => {
    const { getByTestId } = render(<ProfileScreen />);
    const text = getByTestId('profile-text');
    expect(text.props.style).toMatchObject({
      fontSize: 24,
      fontWeight: 'bold',
    });
  });
});
