import * as React from "react";
import { TouchableOpacity, View, ScrollView, Text, StyleSheet, Button, Switch, TextInput, Alert } from "react-native";
import { UserNameContext } from "../MainContainer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from "axios";
import { Rating} from 'react-native-ratings';
import { useIsFocused } from "@react-navigation/native";

export default function PostJournal({ route, navigation }) {
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
            axios.post( "https://sojourn-user-auth.herokuapp.com/api/fetchVisitedLocations" ,
                {
                    username: route.params.username,
                }
            )    
            .then(
                (response) => {
                    let nameList = [];
                    let idList = [];
                    nameList = response.data.map(({locationName})=>
                        locationName
                    );

                    idList = response.data.map(({id})=>
                        id
                    );
                    setDataIds(idList);
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
                    New Entry
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
                                rating: rating,
                                privateEntry: switchVal
                            }
                        )    
                        .then(
                            (response) => {
                                // console.log(response.data); // Json of the newly added json to collection    
                                alert("Journal Has Been Posted!");
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
                        marginTop: "4%",
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 0,
                        elevation: 3,
                        overflow: 'hidden'
                    }}
                    dropdownTextStyle={{ paddingLeft:"5%",fontSize:16}}
                >
                </ModalDropdown>

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

            <View style = {{borderBottomWidth:1, borderBottomColor:"#DFDFE2", flexDirection:"row",width:"100%", height:"5%"}}>
                    <Text style={{marginTop:"3%", paddingLeft:"4%", fontSize:16}}>
                        Rate this location
                    </Text>
                    <Rating
                    style={{marginTop:"2%", marginLeft:"35%"}}
                    type='star'
                    ratingCount={5}
                    imageSize={25}
                    startingValue={0}
                    onFinishRating={(rate)=>setRating(rate)}
                    />
            </View> 

            <View style = {{borderBottomWidth:1, borderBottomColor:"#DFDFE2", flexDirection:"row",width:"100%", height:"5%"}}>
                    <Text style={{marginTop:"3%", paddingLeft:"4%", fontSize:16}}>
                        Make this entry private?
                    </Text>
                    <Switch 
                        style={{marginTop:"1.75%", marginLeft:"40%"}}
                        trackColor={{false:"grey",true:"#379BD8"}} 
                        thumbColor = {"white"} 
                        value = {switchVal}
                        onValueChange = {(value) => setSwitchVal(value)}
                    >
                    </Switch>
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