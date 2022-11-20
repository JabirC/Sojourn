import * as React from "react";
import { useState, useEffect, state } from "react";
import { StyleSheet, Text, View} from "react-native";
import MapView from "react-native-maps";
import { UserNameContext } from "../MainContainer";
import { Marker } from "react-native-maps";
import { Polyline } from "react-native-maps";
import axios from "axios"


const url = "https://sojourn-user-auth.herokuapp.com/api/locations";


const nycRegion = {
    latitude: 40.7465,
    longitude: -74.0014,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  

export default function MapScreen({ navigation }) {
  const username = React.useContext(UserNameContext);
  const [locations, setLocations] = useState([]);

  const [state, setState] = useState({locations:[]});

   
  useEffect(() => {
  
  const getLocations = () => {
    axios
      .post("https://sojourn-user-auth.herokuapp.com/api/getLocations",
      {
      "query": "ALL"
      })
      .then((response) => setLocations(response.data))
      .catch((error) => console.error(error));
    }
    getLocations();
},[]);
  




  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('Placeholder Map screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>
                    
                
                Map Screen
            </Text>
            <MapView

            style={styles.map}

            initialRegion={nycRegion}
            >
            {locations.map((loc) => {
                    return (
                        <Marker
                            key={loc._id}
                            title={loc.NAME}
                            coordinate={{
                              latitude: loc.LATITUDE,
                              longitude: loc.LONGITUDE
                            }}
                            onPress={ (event) =>
                            navigation.navigate("JournalScreen", {locationVal: loc._id})}
                            
                        />
                    )
                })}
          
  

            </MapView>

        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, 
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
