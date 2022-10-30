import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainContainer from "./frontend/MainContainer.js";
import SignInScreen from './frontend/screens/SignInScreen.js';
import SignUpScreen from './frontend/screens/SignUpScreen.js';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function MyStack(){
  return (
    <Stack.Navigator initialRouteName='SignInScreen' screenOptions={{headerShown:false}}>

      <Stack.Screen name = "SignInScreen" component={SignInScreen}/>

      <Stack.Screen name = "SignUpScreen" component={SignUpScreen}/>

      <Stack.Screen name = "MainContainer" component={MainContainer}/>
        
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}
