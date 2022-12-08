import React, {useState, setState, useEffect} from "react";
import {orderByDistance} from 'geolib';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from 'axios';
const windowWidth = Dimensions.get("window").width;

/* To go through and generate itineraries, iterate through the sorted array of locations
(orderedLoc, starting at index 1 as index 0 is the origin) and add locations to a new array to constitute
the itinerary locations. The array is already pre-sorted closest to farthest, so for "distance" priority 
just pick the first n locations, with n equaling the number of destinations chosen.

If route.params.priority == "cost", have a second parameter going through where it only adds if 
cost <= the cost of origin (ex route.params.o.cost >= orderedLoc[n].cost
    
If route.params.priority == "similarity", have it similar to above where it is only added to the array
if route.params.o.location_type == orderedLoc[n].location_type

Good luck!*/

export default function ItineraryGenScreen({ route, navigation }) {
    const [locations, setLocations] = React.useState([]);
    const [orderedLoc, setOrderedLoc] = React.useState([]);

    React.useEffect(() => {
        axios
          .post("https://sojourn-user-auth.herokuapp.com/api/getLocations", {
            query: "ALL",
          })
          .then((response) => {
            setLocations(response.data);
          })
          .catch((response) => {
            alert(response.response.data);
          });
      }, []);

      const ordered = orderByDistance(
        {
         latitude: route.params.o.latitude,
         longitude: route.params.o.longitude
        },
        
         locations);

        

      React.useEffect(() => {
            //Sorts locations by closest to origin
           setOrderedLoc(ordered);
           //NOTE!!! the nearest location is orderedLoc[1], as the first index will be the same location as the origin!)
           
      }, []);

      
    return(
    <View style = {{flex: 1, alignItems: 'center', marginTop: "20%"}}>
        {/* Go Back */}
        <TouchableOpacity onPress={() => navigation.goBack(null)} style = {{alignSelf:"flex-start",position:"absolute",marginLeft:"5%",marginTop:"1.5%"}}>
            <Ionicons name={"chevron-back-circle"} size={50} color={"black"}/>
        </TouchableOpacity>
        
        <Text style = {styles.header}>
            
            {route.params.o.NAME + " is the name of the origin."}
            {"\n \n" + route.params.Num + " is the number of destinations."}
            {"\n \n" + route.params.p + " is the priority."}
            {"\n \n" + orderedLoc[1].NAME + " is the nearest location."}
            
        </Text>
        
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        fontSize: 30, 
        fontWeight: 'bold',
        textAlign:"center",
        marginBottom:"5%",
        paddingTop:"20%",
    },
    
});

