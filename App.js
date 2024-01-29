import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing components from screens directory
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
import ReadScreen from './screens/ReadScreen';
import EditScreen from './screens/EditScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Create" component={CreateScreen} />
      <Stack.Screen name="Read" component={ReadScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}
export default App;
