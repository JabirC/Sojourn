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
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
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
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {locations.concat(origin).map((loc) => {
                      /* Below maps out each location from the database to a marker */
                      /* In the callout onPress, fetchLocationPublicJournals should be implemented.*/
                            return (
                                <Marker
                                    key={loc._id}
                                    title={loc.NAME}
                                    coordinate=
                                    {{
                                    latitude: loc.latitude,
                                    longitude: loc.longitude
                                    }}
                                >
                                  <Callout 
                                        /* Double click navigates to new journal page */
                                        style={{alignItems:"center"}}>
                                        
                                        <View>
                                          
                                            
                                            <Text style={{fontSize:8}}>{loc.NAME}</Text>
                                        
                                            
                                        </View>

                                    </Callout>
                                  
                        
                                </Marker>
                                
                            )
                        })}
          {/* <FlatList
            data={locations}
            renderItem={({ item }) => (
              <MapView.Marker
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={item.NAME}
                // description={item.description}
              />
            )}
            keyExtractor={(item) => {
              item.latitude + item.longitude + item._id;
            }}
          /> */}
        </MapView>
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
