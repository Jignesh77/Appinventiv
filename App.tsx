import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App = () =>
<NavigationContainer>
<RootNavigator />
</NavigationContainer>
;

export default App;