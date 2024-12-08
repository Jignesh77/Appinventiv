/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import AppNavigator from './AppNavigator';
import ProductDetail from '../screens/ProductDetail';
const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
      }}
    >
      <Stack.Screen
        name={'Login'}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'BottomTab'}
        component={AppNavigator}
        options={{
            headerShown: false,
          }}
      />
      <Stack.Screen
        name={'Detail'}
        component={ProductDetail}
      />
      </Stack.Navigator>
  );
};
// eslint-disable-next-line semi
export default RootNavigator
