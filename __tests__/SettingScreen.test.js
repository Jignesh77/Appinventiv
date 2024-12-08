import React from 'react';
import { render } from '@testing-library/react-native';
import SettingScreen from '../src/screens/SettingScreen'; 

describe('SettingScreen Component', () => {
  it('renders the SettingScreen text', () => {
    const { getByText } = render(<SettingScreen />);
    const settingText = getByText('Setting');
    expect(settingText).toBeTruthy();
  });

  it('applies correct styles to the container', () => {
    const { getByTestId } = render(<SettingScreen />);
    const container = getByTestId('container');
    expect(container.props.style).toMatchObject({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    });
  });

  it('applies correct styles to the text', () => {
    const { getByTestId } = render(<SettingScreen />);
    const text = getByTestId('setting-text');
    expect(text.props.style).toMatchObject({
        fontSize: 24,
        fontWeight: 'bold',
      });
  });
});
