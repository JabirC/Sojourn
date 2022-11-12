import * as React from "react";
import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SettingsScreen({ route, navigation }) {
    return (
        <View style = {{flex: 1, alignItems: 'center', marginTop: "20%"}}>
            {/* Go Back */}
            <TouchableOpacity onPress={() => navigation.goBack()} style = {{alignSelf:"flex-start",position:"absolute",marginLeft:"5%",marginTop:"1.5%"}}>
                <Ionicons name={"chevron-back-circle"} size={50} color={"black"}/>
            </TouchableOpacity>
            
            <Text style = {styles.header}>
                Settings
            </Text>

            <Text style = {styles.resetPass} onPress = {() => navigation.navigate("ChangePasswordScreen", {username:route.params.username})}>
                Change Password? 
            </Text>        
        </View>
    );
}


const styles = StyleSheet.create({
    header:{
        fontSize: 45, 
        fontWeight: 'bold',
        textAlign:"center",
        marginBottom:"5%"
    },
    resetPass:{
        marginTop: "5%",
        fontSize: 20,
        fontWeight: "bold"
    },
});