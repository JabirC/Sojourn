import * as React from "react";
import { TouchableOpacity, View, ScrollView, Text, StyleSheet, Button, Switch, TextInput, Alert } from "react-native";
import { UserNameContext } from "../MainContainer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from "axios";
import { Rating} from 'react-native-ratings';
import { useIsFocused } from "@react-navigation/native";

export default function CustomPost({ route, navigation }) {
    const isFocused = useIsFocused();
    const username = React.useContext(UserNameContext);
    let [switchVal, setSwitchVal] = React.useState(false);
    let [locationVal, setLocationVal] = React.useState("");
    let [descriptionVal, setDescriptionVal] = React.useState("");
    let [dropDownData, setDropDownData] = React.useState([]);
    let [dataIds, setDataIds] = React.useState([]);
    let [rating, setRating] = React.useState(0);
    // let dropDownData = ["Statue of Liberty", "Central Park", "Empire State Building", "World Trade Center"];
    


    React.useEffect(() => {
        if(isFocused){
            axios.post( "https://sojourn-user-auth.herokuapp.com/api/getLocations" ,
                {
                    query: "ALL",
                }
            )    
            .then(
                (response) => {
                    let nameList = [];
                    nameList = response.data.map(({NAME})=>
                        NAME
                    );
                    setDropDownData(nameList);
                }
            ) 
            .catch(
                (response) => {
                    alert(response.response.data);
                }
            )
        }
    }, [isFocused])

    return (
        <View style={{ height: "100%", width:"100%", backgroundColor:"white"}}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{ height:30, width:30, marginTop:"15%", marginLeft:"2%"}}
                    activeOpacity={0.3}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons color={"#303036"} size={30} name="chevron-back" />
                </TouchableOpacity>
                <Text style={{fontWeight:"bold", fontSize:17, marginTop:"16.5%", marginLeft:"30%"}}
                >
                    Custom Post
                </Text>


                <TouchableOpacity
                    style={{ height:"20%" , marginTop:"16.5%", marginLeft:"26%"}}
                    activeOpacity={0.3}
                    onPress={() => 
                        axios.post( "https://sojourn-user-auth.herokuapp.com/api/journal" ,
                            {
                                username: route.params.username,
                                locationName: locationVal,
                                description: descriptionVal,
                                rating: 0,
                                privateEntry: true,
                                custom: true
                            }
                        )    
                        .then(
                            (response) => {
                                // console.log(response.data); // Json of the newly added json to collection    
                                alert("Journal Has Been Posted!");
                                navigation.goBack();
                                navigation.goBack();
                            }
                        ) 
                        .catch(
                            (response) => {
                                alert(response.response.data);
                            }
                        )
                    } 
                >
                    <Text style={{color:"#379BD8" , fontWeight:"bold", fontSize:17}}>
                    Post
                    </Text>
                </TouchableOpacity>

            </View>

            <View style = {styles.locationEntryRec}>
                
                <Ionicons name={"md-location-outline"} size={30} style = {{position:"absolute", marginLeft:"2%",color:"#303036"}}  />

                <ModalDropdown
                    // ref={dropdown}
                    style={{ width: '100%' }}
                    defaultValue="Choose a location..."
                    textStyle={{paddingLeft:"15%", fontSize: 16}}
                    showsVerticalScrollIndicator={false}
                    options= {dropDownData}
                    
                    onSelect={(e)=>{
                        setLocationVal(dropDownData[e]);
                    }}
                    dropdownStyle={{
                        marginTop: "3%",
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 0,
                        elevation: 3,
                        overflow: 'hidden'
                    }}
                    dropdownTextStyle={{ paddingLeft:"5%",fontSize:16}}
                />

            </View>

            {/* Entry Writing Space */}
            <View style = {{paddingLeft:"4%", width:"100%", height:"20%", borderBottomWidth:1, borderBottomColor:"#DFDFE2"}}>                
                <TextInput 
                   style = {{width:"100%", height:"100%"}}
                   onChangeText = {(e)=>{setDescriptionVal(e)}} 
                   placeholder="Write your entry here..."
                   multiline = {true} 
                   textAlignVertical = {"top"}
                   numberOfLines = {8}
                   fontSize={16}
                >
                </TextInput>   
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {   header: {
            height:"12.5%",
            width:"100%",
            borderBottomWidth:1,
            borderBottomColor:"#DFDFE2",
            flexDirection:"row"
        },
        locationEntryRec: {
            width:"100%",
            height: "6%",
            borderBottomColor: "#DFDFE2",
            borderBottomWidth: 1,
            flexDirection: "row",
            alignItems:"center"
        },
    }
)