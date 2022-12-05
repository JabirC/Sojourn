import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainContainer from "./frontend/MainContainer.js";
import SignInScreen from './frontend/screens/SignInScreen.js';
import SignUpScreen from './frontend/screens/SignUpScreen.js';
import SettingsScreen from './frontend/screens/SettingsScreen.js';
import ChangePassword from './frontend/screens/ChangePassword.js';
import PostJournal from './frontend/screens/PostJournal.js';
import PublicReviewScreen from './frontend/screens/PublicReviewScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function MyStack(){
  return (
    <Stack.Navigator initialRouteName='PublicReviewScrreen' screenOptions={{headerShown:false}}>

      <Stack.Screen name = "SignInScreen" component={SignInScreen}/>

      <Stack.Screen name = "SignUpScreen" component={SignUpScreen}/>

      <Stack.Screen name = "MainContainer" component={MainContainer}/>

      <Stack.Screen name = "SettingsScreen" component={SettingsScreen}/>

      <Stack.Screen name = "ChangePasswordScreen" component={ChangePassword}/>

      <Stack.Screen name = "PostJournal" component={PostJournal}/>

      <Stack.Screen name = "PublicReviewScrreen" component={PublicReviewScreen}/>
        
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
