import * as React from "react";
import { StyleSheet, Text, View, Platform, PermissionsAndroid} from "react-native";
import MapView from "react-native-maps";
import { Marker, PROVIDER_GOOGLE, Callout  } from "react-native-maps";
import axios from "axios";
import  * as GeoLocation from 'expo-location';
import * as TaskManager from "expo-task-manager";
import {findNearest, getDistance, orderByDistance} from 'geolib';
import { UserNameContext } from "../frontend/MainContainer";

const LOC_TASK = "LOC_TASK";


export default class Map extends React.Component{

  static contextType = UserNameContext;
    state = {
      userRegion: null,
      distance: 6,
      closestLocation: [],
      locations: [],
      currentLocationLat: 0,
      currentLocationLong: 0,
      orderedLoc: [],
      hasLocationPermissions: null,
      showsUserLocation: true,
      followsUserLocation : true,
      username: null,
      
      
      
    };

    /* Sorts locations by proximity to user location */
    setOrderedLoc = () => {
      this.setState({orderedLoc: orderByDistance(
        {
         latitude:this.state.currentLocationLat,
         longitude: this.state.currentLocationLong
        },
        
         this.state.locations)});
         console.log("\n orderedLoc: " + JSON.stringify(this.state.orderedLoc))
         
    };

    /* Determines distance between user location and nearest marker/place of interest */
    setDistance = () => {
      if(this.state.orderedLoc[0] != null){
      this.setState({
        distance: getDistance(
          {
            latitude: this.state.currentLocationLat,
            longitude: this.state.currentLocationLong
          },
          
            this.state.orderedLoc[0]
          
          )});}   
          console.log("\n distance: " + JSON.stringify(this.state.distance))
    };

    
    

    /* Sets current user location latitude + longitude */
    setCurrentLatLong = (coords) => {
      this.setState({
        currentLocationLat: coords.latitude,
        currentLocationLong: coords.longitude
      })
    };

   

    async componentDidMount(){

        const user = this.context
        this.setState({username: user})
        
        
        /* The GeoLocation + getLocationAsync are used for realtime location tracking */
        if (Platform.OS == "ios"){
          const { status } = await GeoLocation.requestForegroundPermissionsAsync(); 
          if (status === "granted") {
            this.setState({ hasLocationPermissions: true });
            this._getLocationAsync();
          }
        }

        
        else if (Platform.OS === 'android') {
          const {status} = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (status === PermissionsAndroid.RESULTS.GRANTED)
          {
            this.setState({ hasLocationPermissions: true });
            this._getLocationAsync();
          }
        }

        else {
            alert("Location permission not granted");
          };

        /* The below queries the database for location destinations to populate on the map */  
        axios
        .post("https://sojourn-user-auth.herokuapp.com/api/getLocations",
        {
        "query": "ALL"
        })
        .then((response) => 
        {
            this.setState({locations: response.data});

        })
        .catch((error) => console.error(error));
        
    }

    
/*Realtime Location Tracking*/
  _getLocationAsync = async () => {
    
    await GeoLocation.startLocationUpdatesAsync(LOC_TASK, {
      enableHighAccuracy: true,
      distanceInterval: 1,
      timeInterval: 5000
    });
    // watchPositionAsync Return Lat & Long on Position Change
    this.userlocation = await GeoLocation.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000
      },
      newUserLocation => {
        let { coords } = newUserLocation;
        let userRegion = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        };
        this.setState({ userRegion: userRegion });
        this.setCurrentLatLong(coords);
        this.setOrderedLoc();
        this.setDistance();
      },
      error => console.log(error));
    return this.userlocation;
  };

    render() {
        return (
            <View style={styles.container}>

                <Text
                    /* This text only displays if the map is not loaded and screen is clicked */
                    onPress={() => alert('Map not Loaded')}
                    style={{ fontSize: 26, fontWeight: 'bold' }}>
                    Map Screen

                </Text>

                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    showsUserLocation={this.state.followsUserLocation}
                    followsUserLocation={this.state.followsUserLocation}
                    initialRegion={{
                      latitude: 40.7506,
                      longitude: -73.9935,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01
                    }}
                    region={this.state.userRegion}
                    showsMyLocationButton={true}
                    
                    /* On user location change, nearest locations are updated + queried for proximity */
                    onUserLocationChange={(event)=> 
                    {
                        console.log(event.nativeEvent);
                        this.setOrderedLoc();
                        this.setDistance();
                        console.log("\n username: " + this.state.username)
                       
                        if(this.state.distance <= 20 && this.state.orderedLoc[0] != null && this.state.username != null)
                          {
                          console.log("\n" + this.state.orderedLoc[0].NAME + " is within 20 meters!")
                          console.log("\n username: " + this.state.username)
                          
                          axios
                          .post("https://sojourn-user-auth.herokuapp.com/api/addvisitedlocation",
                            {
                            username: this.state.username,
                            locationName: this.state.orderedLoc[0].NAME,
                            journaled: false,
                            _id: this.state.orderedLoc[0]._id,
                            }
                          )
                          .catch((error) => console.error("\n location visited already: " + error)),

                          axios.post("https://sojourn-user-auth.herokuapp.com/api/rankingAddOrLoseExperience",
                          {
                            username: this.state.username,
                            experience: 5,
                          })
                          .catch((error) => console.error("\n experience error: " + error)),
                          console.log("experience added!");
                        }
                        }}
                        >
                          
                        
                    
                 
                    
                    {this.state.locations.map((loc) => {
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
                                        style={styles.callout}
                                        onPress={() => this.props.navigation.navigate("PostJournal", {locationVal: loc._id})}>
                                        
                                        <View>
                                          
                                            
                                            <Text style={styles.calloutTitle}>{loc.NAME}</Text>
                                        
                                            <Text style={styles.calloutDescription}>Post Journal?</Text>
                                        </View>

                                    </Callout>
                        
                                </Marker>
                                
                            )
                        })}
    
                </MapView>
    
            </View>
        );
    }
  }
  
  /* Styling of all components */
  const styles = StyleSheet.create({

    container: 
    {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    
    map: 
    {
        ...StyleSheet.absoluteFillObject,
    },


    callout:
    {
        alignItems:"center",
        justifyContent:"center"
    },

    calloutTitle: 
    {
        fontSize: 17,
        marginBottom: 5,
        fontWeight: "bold",
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    calloutDescription: 
    {
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }

  });

  /* Manages the background user location updating */
  TaskManager.defineTask(LOC_TASK, async ({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }


    if (data) {
      console.log("user location updated!")
    }
});
  
 
  

