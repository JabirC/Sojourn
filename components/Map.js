import * as React from "react";
import { StyleSheet, Text, View, useEffect} from "react-native";
import MapView from "react-native-maps";
import { Marker, PROVIDER_GOOGLE, Callout  } from "react-native-maps";
import axios from "axios"
import  * as GeoLocation from 'expo-location';
import * as TaskManager from "expo-task-manager"

const LOC_TASK = "LOC_TASK";


export default class Map extends React.Component{

    state = {
      userRegion: null,
      locations: [],
      userlocations: [],
      hasLocationPermissions: null,
      showsUserLocation: true,
      followsUserLocation : true,
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
      },
      error => console.log(error)
    );
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
                    onUserLocationChange={(event)=> 
                    {
                        console.log(event.nativeEvent);
                        region:{this.state.userRegion};
                    }}
                >

                    {this.state.locations.map((loc) => {
                            return (
                                <Marker

                                    key={loc._id}
                                    title={loc.NAME}
                                    coordinate=
                                    {{
                                    latitude: loc.LATITUDE,
                                    longitude: loc.LONGITUDE
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

  TaskManager.defineTask(LOC_TASK, async ({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      /* this is where proximity event will occur */
   
    }
});
  
 
  

