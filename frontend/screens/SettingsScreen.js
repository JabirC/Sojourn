import * as React from "react";
import { StyleSheet, Text, TextInput, View, Dimensions, Button} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SettingsScreen({ route, navigation }) {
    return (
        <View style = {{flex: 1, alignItems: 'center', marginTop: "20%"}}>
            <Text style = {styles.header}>
                Settings
            </Text>

            <Text style = {styles.resetPass} onPress = {() => navigation.navigate("ResetPasswordScreen")}>
                Reset Password?
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