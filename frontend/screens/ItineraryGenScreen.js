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

import MapView, { Marker, PROVIDER_GOOGLE, Polyline, Callout} from "react-native-maps";
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
  // const [locations, setLocations] = React.useState([]);
  const [orderedLoc, setOrderedLoc] = React.useState([]);
  const [itinTwo, setItinTwo] = React.useState([]);
  const [itinThree, setItinThree] = React.useState([]);
  const [markerLocations, setMarkerLocations] = React.useState([]);
  // console.log("heha");
  // console.log(masterLocations);

  const sortByCost = (locations) => {
    let sortedByCost = locations;
    const finalArray = sortedByCost.sort(function (a, b) {
      // Subtraacts cost to get a value that is either negative, positive, or zero. and arranges them smallest to largest
      return a.PRICING - b.PRICING;
    });
    setItinTwo(itinTwoCurate(finalArray));
    setItinThree(itinThreeCurate(finalArray));
    // console.log("this is itntwo");
    // console.log(itinTwo.length);
    return finalArray;
  };
  const sortBySimilarity = (start, locations) => {
    let sortedBySimilarity = [];
    for (let i = 0; i < locations.length; i++) {
      if (start.LOCATION_TYPE === locations[i].LOCATION_TYPE) {
        sortedBySimilarity.push(locations[i]);
      }
    }
    setItinTwo(itinTwoCurate(sortedBySimilarity));
    setItinThree(itinThreeCurate(sortedBySimilarity));
    // console.log("this is itntwo");
    // console.log(itinTwo.length);
    return sortedBySimilarity;
    // return sortedBySimilarity.sort(function (a, b) {
    //   // Subtraacts cost to get a value that is either negative, positive, or zero. and arranges them smallest to largest
    //   return a.LOCATION_TYPE - b.LOCATION_TYPE;
    // });
  };
  const sortByDistance = (locations) => {
    let sortedByDistance = locations;
    let finalArray = orderByDistance(
      {
        latitude: origin.latitude,
        longitude: origin.longitude,
      },
      sortedByDistance
    );
    setItinTwo(itinTwoCurate(finalArray));
    setItinThree(itinThreeCurate(finalArray));
    return finalArray;
  };

  const itinTwoCurate = (locations) => {
    let curatedLocs = [];
    for (let i = 1; i < destinationNum * 2 + 1; i++) {
      // even
      if (i % 2 == 1) {
        curatedLocs.push(locations[i]);
      }
    }
    // console.log(curatedLocs);
    return curatedLocs;
  };

  const itinThreeCurate = (locations) => {
    let curatedLocs = [];
    for (let i = 1; i < destinationNum * 2 + 1; i++) {
      // even
      if (i % 2 == 0) {
        curatedLocs.push(locations[i]);
      }
    }
    // console.log(curatedLocs);
    return curatedLocs;
  };

  React.useEffect(() => {
    //Sorts locations by closest to origin
    // setOrderedLoc(ordered);
    //NOTE!!! the nearest location is orderedLoc[1], as the first index (0) will be the same location as the origin!)
    // console.log("priority is: " + priority);
    // console.log(origin);
    if (priority === "cost") {
      // console.log("in priority === cost");
      setOrderedLoc(sortByCost(masterLocations));
      // console.log(setItinTwo(itinTwoCurate(orderedLoc)));
    } else if (priority === "distance") {
      // console.log("in priority === distance");
      setOrderedLoc(sortByDistance(masterLocations));
    } else if (priority === "similarity") {
      // console.log("in priority === similarity");
      setOrderedLoc(sortBySimilarity(origin, masterLocations));
    }
  }, []);

  React.useEffect(() => {
    setMarkerLocations(orderedLoc.slice(1, destinationNum + 1).concat(origin))
  }, []);

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
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: "5%"
        }}
      >
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

        {/* ITINERARIES */}
        <View style={styles.itinerarySectionView}>
          {/* ITINERARY ONE: TOP # */}
          <TouchableOpacity
            style={styles.itineraryContainer}
            onPress={() => {
              navigation.navigate("ItinerarySelection", {
                origin: origin,
                destinationNum: destinationNum,
                locations: orderedLoc.slice(1, destinationNum + 1),
              });
            }}
          >
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.mapStyle}
              initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
              }}
            >
              {orderedLoc.slice(0, destinationNum+1).map((loc) => {
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

                        
                        
                        

              
            </MapView>
            <FlatList
              // data={orderedLoc}
              data={orderedLoc.slice(1, destinationNum + 1)}
              renderItem={ItemView}
              ItemSeparatorComponent={ItemSeparatorView}
              keyExtractor={(item) => item._id}
            />
          </TouchableOpacity>
          {/* ITINERARY TWO: ODD */}
          <TouchableOpacity
            style={styles.itineraryContainer}
            onPress={() => {
              navigation.navigate("ItinerarySelection", {
                origin: origin,
                destinationNum: destinationNum,
                locations: itinTwo.slice(0, destinationNum + 1),
              });
            }}
          >
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.mapStyle}
              initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
              }}
            >
              {itinTwo.slice(0, destinationNum+1).concat(origin).map((loc) => {
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
                data={itinTwo.slice(0, destinationNum + 1)}
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
                  item.latitude + item._id;
                }}
              /> */}
            </MapView>
            <FlatList
              // data={orderedLoc}
              data={itinTwo.slice(0, destinationNum + 1)}
              renderItem={ItemView}
              ItemSeparatorComponent={ItemSeparatorView}
              keyExtractor={(item) => item._id}
              // keyExtractor={(item, index) => "key" + index}
            />
          </TouchableOpacity>
          {/* ITINERARY THREE: EVEN */}
          <TouchableOpacity
            style={styles.itineraryContainer}
            onPress={() => {
              navigation.navigate("ItinerarySelection", {
                origin: origin,
                destinationNum: destinationNum,
                locations: itinThree.slice(0, destinationNum + 1),
              });
            }}
          >
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.mapStyle}
              initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
              }}
            >
              {itinThree.slice(0, destinationNum+1).concat(origin).map((loc) => {
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
                data={itinThree.slice(0, destinationNum + 1)}
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
                  item.longitude + item._id;
                }}
              /> */}
            </MapView>
            <FlatList
              // data={orderedLoc}
              data={itinThree.slice(0, destinationNum + 1)}
              renderItem={ItemView}
              ItemSeparatorComponent={ItemSeparatorView}
              keyExtractor={(item) => item._id}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // paddingTop: "5%",
  },
  header: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "stretch",
    // marginBottom: "5%",
    // paddingTop: "20%",
  },
  itinerarySectionView: {
    flex: 1,
    // alignSelf: "stretch",
  },
  itineraryContainer: {
    flex: 1,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  flatListStyle: {
    // flex: 3,
  },
  mapStyle: {
    // flex: 1,
    // paddingLeft: "25%",
    height: "75%",
    width: "34%",
  },
});
