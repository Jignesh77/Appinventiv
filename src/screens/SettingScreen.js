import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SettingScreen = () => (
  <View style={styles.container} testID="container">
    <Text style={styles.text} testID="setting-text">Setting</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 24, fontWeight: 'bold'},
});

export default SettingScreen;
