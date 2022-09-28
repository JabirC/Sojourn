import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Polyline } from "react-native-maps";

const nycRegion = {
    latitude: 40.730610,
    longitude: -73.935242,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

export default function MapScreen({ navigation }) {
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
             <Marker coordinate={nycRegion} />

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
