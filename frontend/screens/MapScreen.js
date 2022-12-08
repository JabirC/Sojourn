import * as React from "react";
import { View} from "react-native";
import Map from "../../components/Map.js";
import { UserNameContext } from "../MainContainer";


  

export default function MapScreen(props) {

    const username = React.useContext(UserNameContext);
  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <Map 
                navigation = {props.navigation}
                user = {props.username}/>
        </View>
    );
}


