import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen';
import { Alert } from 'react-native';

jest.mock('react-native-otp-entry', () => ({
  OtpInput: ({ onTextChange }) => (
    <mock-otp-input testID="otp-input" onChangeText={onTextChange} />
  ),
}));

describe('LoginScreen Component', () => {
  const mockNavigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the phone input screen initially', () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    expect(getByPlaceholderText('Phone Number')).toBeTruthy();
    expect(getByText('Send OTP')).toBeTruthy();
  });

  it('transitions to the OTP input screen after sending OTP', () => {
    const { getByText, getByTestId, queryByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByText('Send OTP'));

    // Phone input should be gone, OTP input should appear
    expect(queryByPlaceholderText('Phone Number')).toBeNull();
    expect(getByText('Enter OTP:')).toBeTruthy();
    expect(getByTestId('otp-input')).toBeTruthy();
  });

  it('navigates to BottomTab on valid OTP', () => {
    const { getByText, getByTestId } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByText('Send OTP'));
    const otpInput = getByTestId('otp-input');

    fireEvent.changeText(otpInput, '123456');
    fireEvent.press(getByText('Verify OTP'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('BottomTab');
  });

  it('shows an alert on invalid OTP', () => {
    jest.spyOn(Alert, 'alert');

    const { getByText, getByTestId } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByText('Send OTP'));
    const otpInput = getByTestId('otp-input');

    fireEvent.changeText(otpInput, '654321');
    fireEvent.press(getByText('Verify OTP'));

    expect(Alert.alert).toHaveBeenCalledWith('Invalid OTP');
  });
});
