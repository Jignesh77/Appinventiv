import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
// import OTPInputView from 'react-native-otp-input';

const LoginScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = async () => {
    setIsOtpSent(true);
    Alert.alert('123456');
  };

  const handleVerifyOtp = () => {
    console.log('otp==',otp);
    if (otp === '123456') {
      navigation.navigate('BottomTab');
    } else {
      Alert.alert('Invalid OTP');
    }
  };

  return (
    <View style={styles.container}>
      {!isOtpSent ? (
        <>
          <Text style={styles.label}>Enter Phone Number:</Text>
          <TextInput
            maxLength={10}
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <Button title="Send OTP" onPress={handleSendOtp} />
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter OTP:</Text>
          <OtpInput
                    numberOfDigits={6}
                    onTextChange={(text) => {
                      setOtp(text);
                    }}
                    focusColor={'white'}
                    theme={{
                      containerStyle: styles.otp_container,
                      pinCodeContainerStyle: styles.otp_pin_container,
                      pinCodeTextStyle: styles.otp_text,
                      filledPinCodeContainerStyle: { height: '92%' },
                      focusStickStyle: { maxHeight: '92%' },
                    }}
                  />
          <Button title="Verify OTP" onPress={handleVerifyOtp} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  label: {fontSize: 16, marginBottom: 10},
  input: {borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5},
  otpInput: {width: '80%', height: 100},
  otp_container: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom:7,
    backgroundColor: 'white',
    borderRadius: 30,
    height:40,
    justifyContent: 'space-evenly',
  },
  otp_pin_container: {
    maxHeight: '92%',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    borderColor: 'green',
    width: '8%',
    height: 'auto',
  },
  otp_text: {
    fontSize:20,
    color: 'grey',
  },
});

export default LoginScreen;
