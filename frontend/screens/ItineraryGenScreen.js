import React, { useState, setState, useEffect } from "react";
import { orderByDistance } from "geolib";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import ItineraryScreen from "./ItineraryScreen";
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
  // to access passed params from prev screen use route.params.varName
  const origin = route.params.origin;
  const destinationNum = route.params.destinationNum;
  const priority = route.params.priority;
  const masterLocations = route.params.masterLocations;
  const [locations, setLocations] = React.useState([]);
  const [orderedLoc, setOrderedLoc] = React.useState([]);
  // console.log("heha");
  // console.log(masterLocations);

  const ordered = orderByDistance(
    {
      latitude: origin.latitude,
      longitude: origin.longitude,
    },
    masterLocations
  );

  React.useEffect(() => {
    //Sorts locations by closest to origin
    setOrderedLoc(ordered);
    //NOTE!!! the nearest location is orderedLoc[1], as the first index (0) will be the same location as the origin!)
  }, []);

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemStyle}>
        <Text
          style={{
            fontSize: 16,
            // fontWeight: "bold",
          }}
        >
          {item.NAME}
        </Text>
      </TouchableOpacity>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View style={{ paddingBottom: "1%", backgroundColor: "lightgray" }} />
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", marginTop: "20%" }}>
        {/* Go Back */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            // console.log("testing opacity");
          }}
          style={{
            // borderWidth: 1,
            alignSelf: "flex-start",
            marginLeft: "5%",
            marginTop: "1.5%",
          }}
        >
          <Ionicons name={"chevron-back-circle-outline"} size={50} />
        </TouchableOpacity>

        <Text style={styles.header}>
          {origin.NAME + " is the name of the origin."}
          {"\n \n" + destinationNum + " is the number of destinations."}
          {"\n \n" + priority + " is the priority."}
          {/* {"\n \n" + orderedLoc[1].NAME + " is the nearest location."} */}
        </Text>
        <Text>
          {"the " + destinationNum + " requested additional locations are:"}
        </Text>

        {/* ISSUE: create 4 flatlists or could do a flatlist of flatlists or section list https://reactnative.dev/docs/sectionlist */}
        <FlatList
          // data={orderedLoc}
          data={orderedLoc.slice(1, destinationNum + 1)}
          renderItem={ItemView}
          ItemSeparatorComponent={ItemSeparatorView}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // backgroundColor: "lightgreen",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "5%",
    paddingTop: "20%",
  },
});
