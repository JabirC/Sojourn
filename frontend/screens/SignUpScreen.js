import * as React from "react";
import { View, Text, StyleSheet, Button, Switch, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";

function attemptSignUp(newUser, newPass, newEmail, navigation){
    // const client = axios.create({
    //     baseURL: "https://sojourn-user-auth.herokuapp.com/api/users"
    // });
    let failMessage = "The username and email combo you entered already exists. Please try again.";
    let usernameTooShortMessage = '"username" length must be at least 5 characters long';

    axios.post( "https://sojourn-user-auth.herokuapp.com/api/users" ,
        {
            // username : newUser,
            // email: newEmail,
            // password: newPass
            username: newUser ,
	        email: newEmail,
	        password: newPass
        }
    )
    .then(
        (response) => {
            // console.log(response.data); // Json of the newly added json to collection    
            navigation.navigate("MainContainer", {username:username});

            // navigation.goBack(); // This can make it so that user sent back to sign in after correct signup
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
            // alert(failMessage);
            alert(response.response.data);
        }
    );
}


export default function SignUpScreen({ navigation }) {
    const [inputEmail, setInputEmail] = React.useState("");
    const [inputUsername, setInputUsername] = React.useState("");
    const [inputPassword, setInputPassword] = React.useState("");

    return (
        <View style={styles.generalLayout}>
            <Text style={styles.welcomeText}>
                Welcome to Sojourn
            </Text>
            
            {/* Input Email */}
            <TextInput style = {styles.input} placeholder = "Enter Email"  onChangeText={(text) => setInputEmail(text)}/>

            {/* Input Username */}
            <TextInput style = {styles.input} placeholder = "Enter username" onChangeText={(text) => setInputUsername(text)}/>

            {/* Input Password */}
            <TextInput style = {styles.input} placeholder = "Enter password" onChangeText={(text) => setInputPassword(text)} secureTextEntry = {true}/>

            {/* Sign Up Button */}
            <View style = {styles.signUp}>
                <Button title = "Sign Up" 
                onPress={() => attemptSignUp(inputUsername, inputPassword, inputEmail, navigation)} color = "black" > </Button>
            </View>

            {/* navigation.navigate("SignInScreen") */}

            {/* Sign Up Button */}
            <Text style = {styles.resetUserPass}>
                All fields are required and must be at least 5 characters long
            </Text>

        </View>
    );
}

const styles = StyleSheet.create(
    {
        generalLayout:{
            flex: 1, 
            alignItems: 'center', 
            marginTop: "20%"
        },
        welcomeText:{
            fontSize: 45, 
            fontWeight: 'bold',
            textAlign:"center",
            marginBottom:"5%",
            width:"90%"
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
        signIn:{
            marginTop: "7.5%",
            width: "35%",
        },
        signUp:{
            marginTop: "5%",
            width: "35%"
        },
        resetUserPass:{
            marginTop: "5%",
            fontSize: 16,
            fontWeight: "bold",
            width: "75%",
            textAlign:"center"
        },
    }
)