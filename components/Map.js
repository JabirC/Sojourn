import * as React from "react";
import { StyleSheet, Text, View, useEffect} from "react-native";
import MapView from "react-native-maps";
import { Marker, PROVIDER_GOOGLE, Callout  } from "react-native-maps";
import axios from "axios";
import  * as GeoLocation from 'expo-location';
import * as TaskManager from "expo-task-manager";
import {findNearest, getDistance, orderByDistance} from 'geolib';

const LOC_TASK = "LOC_TASK";



export default class Map extends React.Component{

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
    };

    setOrderedLoc = () => {
      this.setState({orderedLoc: orderByDistance(
        {
         latitude:this.state.currentLocationLat,
         longitude: this.state.currentLocationLong
        },
        
         this.state.locations)});
         console.log("orderedLoc: " + JSON.stringify(this.state.orderedLoc))
         
    };

    setDistance = () => {
      this.setState({
        distance: getDistance(
          {
            latitude: this.state.currentLocationLat,
            longitude: this.state.currentLocationLong
          },
          
            this.state.orderedLoc
          
          )});

          
    };



    setCurrentLatLong = (coords) => {
      this.setState({
        currentLocationLat: coords.latitude,
        currentLocationLong: coords.longitude
      })
      
    };

    async componentDidMount(){
      
    
        const { status } = await GeoLocation.requestForegroundPermissionsAsync(); 
        /* The GeoLocation + getLocationAsync are used for realtime location tracking */
        if (status === "granted") {
            this.setState({ hasLocationPermissions: true });
            this._getLocationAsync();
        }

        else {
            alert("Location permission not granted");
          }

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
        // console.log(coords);
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

                    onPress={() => alert('Map not Loaded')}
                    style={{ fontSize: 26, fontWeight: 'bold' }}>
                    Map Screen

                </Text>

                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    showsUserLocation={this.state.followsUserLocation}
                    followsUserLocation={this.state.followsUserLocation}
                    region={this.state.userRegion}
                    showsMyLocationButton={true}
                    
                    onUserLocationChange={(event)=> 
                    {
                        console.log(event.nativeEvent);
                        this.setOrderedLoc();
                        this.setDistance();
                       
                        if(this.state.distance <= 5)
                          {
                          console.log("location is within 5 meters!")
                          }
                          /*axios
                          .post("https://sojourn-user-auth.herokuapp.com/api/addvisitedlocation",
                            {
                            username: this.state.username,
                            locationname: this.state.closestLocation.NAME,
                            journaled: false,
                            id: this.state.closestLocation._id,
                            }
                          )
                          .catch((error) => console.error(error)),

                          axios.post("https://sojourn-user-auth.herokuapp.com/api/rankingAddOrLoseExperience",
                          {
                            username: this.state.username,
                            experience: 10,
                          })
                          .catch((error) => console.error(error)),
                          console.log("experience added!"));
                          
                        */
                    }}
                >

                    {this.state.locations.map((loc) => {
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

  TaskManager.defineTask(LOC_TASK, async ({ data, locations, error }) => {
    if (error) {
      console.log(error);
      return;
    }


    if (data) {
      console.log("user location updated!")
    }
});
  
 
  

