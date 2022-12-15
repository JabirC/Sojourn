import * as React from "react";
import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity, Button} from "react-native";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function attemptResetPassword(email, username, newPassword, confirmNewPassword, navigation){
    axios.post( "https://sojourn-user-auth.herokuapp.com/api/resetPassword" ,
        {
            email: email,
	        username: username,
            password: newPassword,
            passwordConfirmation: confirmNewPassword
        }
    )
    .then(
        (response) => {
            console.log(response.data); // Json of the newly added json to collection    
            navigation.navigate("SignInScreen", {username:username});
        }
    )
    .catch(
        (response) => {
            // console.log(response); // [AxiosError: Request Failed], this is some form of obj
            // console.log(response.response.data); // The res.status(number).send(string) or the api's schema checks that are broken
            // console.log(response.request); //big json of info about the request it seems
            // console.log(response.message); // The message part after Request Failed in response, this is actual string
            // console.log(response.response.headers); // medium size json of info
            // console.log(response.response.status); // The status code of the response
            alert(response.response.data);

        }
    );
}

export default function ResetPassword({ route, navigation }) {
    const [inputEmail, setInputEmail] = React.useState("");
    const [inputUsername, setInputUsername] = React.useState("");
    const [inputNewPassword, setInputNewPassword] = React.useState("");
    const [inputConfirmNewPassword, setInputConfirmNewPassword] = React.useState("");

    return (
        <View style = {{flex: 1, alignItems: 'center', marginTop: "20%"}}>
            <Text style = {styles.header}>
                Reset Password
            </Text>

            <TextInput style = {styles.input} placeholder = "Enter email" onChangeText={(text) => setInputEmail(text)}/>

            <TextInput style = {styles.input} placeholder = "Enter username" onChangeText={(text) => setInputUsername(text)}/>
            
            <TextInput style = {styles.input} placeholder = "Enter new password" onChangeText={(text) => setInputNewPassword(text)} secureTextEntry = {true}/>

            <TextInput style = {styles.input} placeholder = "Confirm new password" onChangeText={(text) => setInputConfirmNewPassword(text)} secureTextEntry = {true}/>

            <View style = {styles.resetPass}>    
                <TouchableOpacity style={styles.touchableOuterLayer} onPress={() => attemptResetPassword(inputEmail,inputUsername,inputNewPassword,inputConfirmNewPassword,navigation)}>
                    <Text style = {styles.touchableTextLayer}>
                        RESET PASSWORD
                    </Text>    
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.touchableOuterLayer} onPress={() => alert("List state var vals\n" + inputEmail + "\n" + inputUsername + "\n" + inputNewPassword + "\n" + inputConfirmNewPassword )}> 
                    <Text style = {styles.touchableTextLayer}>
                        DEBUG STATE VARS
                    </Text>
                </TouchableOpacity> */}
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
    touchableOuterLayer:{
        marginTop:"7.5%",
        backgroundColor:"black",   
        width:windowWidth*.5,
        alignSelf:"center"     
    },
    touchableTextLayer:{
        fontWeight:"bold",
        color:"white",
        textAlign:"center",
        fontSize:18,
        paddingTop:"5%",
        paddingBottom:"5%",
    }
});