import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetail from '../screens/ProductDetail';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
            }}
        >
            <Stack.Screen
                name={'Dashboard'}
                component={DashboardScreen}
                options={{headerLeft:null}}
            />
            <Stack.Screen
                name={'Detail'}
                component={ProductDetail}

            />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Setting') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    // Return the appropriate icon
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato', // Active icon color
                tabBarInactiveTintColor: 'gray', // Inactive icon color
                tabBarStyle: { paddingBottom: 5 }, // Custom styles for the tab bar
            })}
        >
            <Tab.Screen name="Dashboard" options={{ headerShown: false }} component={DashboardNavigator} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Setting" component={SettingScreen} />
        </Tab.Navigator>

    );
};

export default AppNavigator;
