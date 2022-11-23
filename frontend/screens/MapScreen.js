import * as React from "react";
import { View} from "react-native";
import Map from "../../components/Map.js"



  

export default function MapScreen(props) {

  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <Map navigation = {props.navigation}/>
        </View>
    );
}


