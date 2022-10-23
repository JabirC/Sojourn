import * as React from "react";
import { View, Text, StyleSheet, Button, Switch } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

let boxWidth = "90%"

export default function JournalScreen({ navigation }) {
    let [switchVal, setSwitchVal] = React.useState(false);

    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
            {/* Location Entry */}
            <View style = {styles.locationEntryRec}>
                <Ionicons name={"md-location-outline"} size={23} style = {styles.locationIcon}  />
                <Text style = {styles.locationEntryText}> 
                    User would be able to enter the location here 
                </Text>
            </View>
            {/* Entry Writing Space */}
            <View style = {styles.journalWriteRec}>                
                <Text style = {styles.locationEntryText}> 
                    User would be able to write the review here and will then be able to toggle a public
                    private switch
                </Text>

                <View style = {styles.publicPrivateSwitch}>
                    <Switch 
                        trackColor={{false:"grey",true:"black"}} 
                        thumbColor = {"black"} 
                        value = {switchVal}
                        onValueChange = {(value) => setSwitchVal(value)}
                    >
                    </Switch>
                    <Text style = {{paddingTop: "12%"}}>
                        Private
                    </Text>
                </View>    
            </View>
            {/* Post Button */}
            <View style = {styles.postButton}> 
                <Button title = "Post" onPress={() => alert("Pressed")} color = "black">
                </Button>
            </View>
            {/* Public/Private Switch with text */}
            <View style = {styles.journalHistoryRec}>
                <Text style = {styles.locationEntryText}> 
                    This is a Placeholder box where the most recent reviews the user wrote,
                    num of which TBD, will be shown here
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        locationEntryRec: {
            width: boxWidth,
            height: "4.5%",
            borderColor: "black",
            borderWidth: 1,
            marginTop: 50,
            flexDirection: "row",
        },
        locationEntryText:{
            flex: 11,
            fontWeight: "bold",
            paddingTop: 2,
        },
        locationIcon:{
            width: "8%",
            flex: 1,
            paddingTop: 1
        },
        journalWriteRec:
        {
            width: boxWidth,
            height: "20%",
            borderColor: "black",
            borderWidth: 1,
            paddingLeft: "2.5%",
            marginBottom: "2.5%"
        },
        journalHistoryRec:
        {
            width: boxWidth,
            height: "50%",
            borderColor: "black",
            borderWidth: 1,
            marginTop: "10%"
        },
        publicPrivateSwitch:{
            paddingLeft:"70%",
            flexDirection:"row"
        },
        postButton:{
            paddingLeft:"70%",
            width: "90%"
        }
    }
)
