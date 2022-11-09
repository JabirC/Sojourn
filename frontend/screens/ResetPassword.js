import * as React from "react";
import { StyleSheet, Text, TextInput, View, Dimensions, Button} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ResetPassword({ route, navigation }) {
    const [inputUsername, setInputUserName] = React.useState("");
    const [inputPassword, setInputPassword] = React.useState("");

    return (
        <View style = {{flex: 1, alignItems: 'center', marginTop: "20%"}}>
            <Text style = {styles.header}>
                Reset Password
            </Text>

            <TextInput style = {styles.input} placeholder = "Enter username" onChangeText={(text) => setInputUserName(text)}/>

            <TextInput style = {styles.input} placeholder = "Enter new password" onChangeText={(text) => setInputPassword(text)}/>

            <View style = {styles.resetPass}>
                <Button title = "RESET PASSWORD" onPress={() => alert("Jabir, the likely course here is an axios to reset and then navigate back to SignInScreen (force new sign in) OR MainContainer (keep user signed in)")} color = "black"> </Button>
                <Button title = "DEBUG STATE VARS" onPress={() => alert("List state var vals\n" + inputUsername + "\n" + inputPassword)} color = "black"> </Button>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    header:{
        fontSize: 45, 
        fontWeight: 'bold',
        textAlign:"center",
    },
    input: {
        width: "75%",
        marginTop:"7.5%",
        height: "7.5%",
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 3,
        fontSize: 25,
        paddingLeft: "5%"
    },
    resetPass:{
        marginTop: "5%",
        width: "35%"
    },
});