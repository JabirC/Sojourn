import React, { useState, setState, useEffect } from "react";
import { orderByDistance } from "geolib";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import axios from "axios";

import MapView from "react-native-maps";
const windowWidth = Dimensions.get("window").width;

export default function ItinerarySelection({ route, navigation }) {
  const origin = route.params.origin;
  const destinationNum = route.params.destinationNum;
  const locations = route.params.locations;

  const ItemView = ({ item }) => {
    return (
      <Text style={styles.itemStyle}>
        <Text
          style={{
            fontSize: 10,
            // fontWeight: "bold",
          }}
        >
          {item.NAME +
            " pricing:" +
            item.PRICING +
            " type:" +
            item.LOCATION_TYPE +
            " lat:" +
            item.latitude +
            " long: " +
            item.longitude}
        </Text>
      </Text>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View style={{ paddingBottom: "1%", backgroundColor: "lightgray" }} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Go Back */}
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          // console.log("testing opacity");
        }}
        style={{
          // borderWidth: 1,
          alignSelf: "flex-start",
          marginLeft: "9%",
        }}
      >
        <Ionicons name={"chevron-back-circle-outline"} size={50} />
      </TouchableOpacity>
      <Text style={styles.header}>
        {"origin: " +
          origin.NAME +
          " \n type: " +
          origin.LOCATION_TYPE +
          " \n lat: " +
          origin.latitude +
          " \n long: " +
          origin.longitude}
      </Text>
      {/* ITINERARY Area */}
      <View>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        />
        <FlatList
          // data={orderedLoc}
          data={locations}
          renderItem={ItemView}
          ItemSeparatorComponent={ItemSeparatorView}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    backgroundColor: "yellow",
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // backgroundColor: "lightgreen",
    // paddingTop: "5%",
  },
  header: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "stretch",
    // marginBottom: "5%",
    // paddingTop: "20%",
    backgroundColor: "pink",
  },
  flatListStyle: {
    flex: 3,
  },
  mapStyle: {
    // flex: 1,
    // paddingLeft: "25%",
    height: "60%",
    width: "100%",
  },
});
