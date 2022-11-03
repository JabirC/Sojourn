import * as React from "react";
import { FlatList, View, Text, StyleSheet, Button, Switch, TextInput, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from "axios";

let boxWidth = "90%"
export default function JournalEntry() {
    let [switchVal, setSwitchVal] = React.useState(false);
    let [locationVal, setLocationVal] = React.useState("");
    let [descriptionVal, setDescriptionVal] = React.useState("");
    let dropDownData = ["Statue of Liberty", "Central Park", "Empire State Building", "World Trade Center"];
    return(
            <View style={styles.journalEntryContainer}>
                <View style = {styles.locationEntryRec}>
                    <ModalDropdown
                        // ref={dropdown}
                        style={{ width: '100%' }}
                        defaultValue="Choose a location..."
                        textStyle={{paddingTop: "1%",paddingLeft:"5%", fontSize: 16}}
                        showsVerticalScrollIndicator={false}
                        options= {dropDownData}
                        onSelect={(e)=>{
                            setLocationVal(dropDownData[e]);
                        }}
                        dropdownStyle={{
                            marginTop: 0.5,
                            width: '90%',
                            borderRadius: 10,
                            borderWidth: 0,
                            elevation: 3,
                            overflow: 'hidden',
                        }}
                        dropdownTextStyle={{paddingLeft:"5%",fontSize:16}}
                    >
                    </ModalDropdown>

                </View>
                {/* Entry Writing Space */}
                <View style = {styles.locationEntryContainer}>                
                    <TextInput 
                    style = {styles.locationEntryText}
                    onChangeText = {(e)=>{setDescriptionVal(e)}} 
                    multiline = {true} 
                    textAlignVertical = {"top"}
                    numberOfLines = {6}
                    overflow= "hidden"
                    >
                    </TextInput>

                    <View style = {styles.publicPrivateSwitch}>
                        <Switch 
                            trackColor={{false:"grey",true:"black"}} 
                            thumbColor = {"black"} 
                            value = {switchVal}
                            onValueChange = {(value) => setSwitchVal(value)}
                        >
                        </Switch>
                        <Text style = {{paddingTop:"13%", fontSize: 14}}>
                            Private
                        </Text>
                    </View>
                </View>
                <Button
                title="Post"
                onPress={()=>{alert("hey")}}
                ></Button>
            </View>
    )
}

const styles = StyleSheet.create(
    {   journalEntryContainer: {
            height: "150%",
            width: "100%",
            flex: 1, 
            alignItems: 'center', 
        },
        locationEntryRec: {
            width: boxWidth,
            height: "20%",
            borderColor: "black",
            borderWidth: 1,
            marginTop: 50,
            flexDirection: "row",
        },
        locationEntryText:{
            textAlign: "left",
            width: "100%",
            height: "100%",
            marginBottom: '-30%',
            paddingRight:"2%",
            fontSize: 14
        },
        locationIcon:{
            width: "8%",
            flex: 1,
            paddingTop: 1
        },
        locationEntryContainer:
        {
            width: boxWidth,
            height: "80%",
            borderColor: "black",
            borderWidth: 1,
            paddingLeft: "2.5%",
            marginBottom: "2.5%",
            paddingBottom: "3%"
        },
        publicPrivateSwitch:{
            paddingLeft:"70%",
            paddingTop:"23%",
            flexDirection:"row"
        }
    }
)