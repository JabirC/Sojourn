import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import JournalScreen from './screens/JournalScreen';
import ItineraryScreen from './screens/ItineraryScreen';

//Screen names
const mapName = "Map";
const profileName = "Profile";
const journalName = "Journal";
const itineraryName = "Itinerary";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
      <Tab.Navigator
        initialRouteName={mapName}
        screenOptions={
            ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === mapName) {
                    iconName = focused ? 'md-map' : 'md-map-outline';

                    } else if (rn === profileName) {
                    iconName = focused ? 'md-person' : 'md-person-outline';

                    } else if (rn === journalName) {
                    iconName = focused ? 'journal' : 'journal-outline';
                    }
                    else if (rn === itineraryName) {
                    iconName = focused ? 'list' : 'list-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: { paddingBottom: 4, fontSize: 12 },
                tabBarStyle: { paddingBottom: 15, height: 65, paddingTop: 8},
                headerShown:false
            })
        }
        >

        <Tab.Screen name={mapName} component={MapScreen} />
        <Tab.Screen name={journalName} component={JournalScreen} />
        <Tab.Screen name={itineraryName} component={ItineraryScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />

      </Tab.Navigator>
  );
}

export default MainContainer;