import * as React from "react";
import { FlatList, View, Text, StyleSheet, Button, Switch, TextInput, Alert } from "react-native";
import { UserNameContext } from "../MainContainer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from "axios";
import { format } from "date-fns";


const ItemSeparator = () => <View style={styles.journalSeparator} />;

let dateColors=["#30483b", "#3b5446"]
let entryColors=["#395144", "#445F50"]

export default function JournalScreen({ navigation }) {
    const username = React.useContext(UserNameContext);
    let [switchVal, setSwitchVal] = React.useState(false);
    let [locationVal, setLocationVal] = React.useState("");
    let [descriptionVal, setDescriptionVal] = React.useState("");
    let [journalsList, setJournalsList] = React.useState([]);
    let [newPost, setNewPost] = React.useState(0); 
    let dropDownData = ["Statue of Liberty", "Central Park", "Empire State Building", "World Trade Center"];

    React.useEffect(() => {
        axios.post( "https://sojourn-user-auth.herokuapp.com/api/readjournals" ,
            {
                username: username,
            }
        )    
        .then(
            (response) => {  
                console.log(newPost);
                setJournalsList(response.data.reverse());
            }
        ) 
        .catch(
            (response) => {
                alert(response.response.data);
            }
        )
    }, [newPost])



    return (
        // style={{ flex: 1, alignItems: 'center', paddingTop: "15%"}}
        <View style={{paddingTop: "10%", flex:1, alignSelf: "stretch", backgroundColor:"#395244"}}>
            <View style={{flex:1, borderBottomWidth:1, borderColor:"#213028"}}>

            </View>
            <View style = {styles.journalHistoryRec}>
                <View>
                    <FlatList 
                        data={journalsList}
                        renderItem={({ item, index }) => 
                                <View style={styles.entryContainer}>
                                    <View style= {{flex: 1, paddingTop: "2%",height: "100%", justifyContent: "center", alignItems:"center", flexDirection: "column", backgroundColor: dateColors[index % dateColors.length]}}>
                                        <Text style= {styles.journalEntryDate}>{format(new Date(item.date), "LLL")}</Text>
                                        <Text style= {styles.journalEntryDate}>{format(new Date(item.date), "do")},</Text>
                                        <Text style= {styles.journalEntryDate}>{format(new Date(item.date), "yyyy")}</Text>
                                    </View>
                                    <View style={{ flex: 4, flexDirection: "column", justifyContent: "center", alignContent:"center", paddingLeft:"3%", backgroundColor: entryColors[index % entryColors.length]}}>
                                        <Text style= {styles.journalEntryLocation}>{item.locationName}</Text>
                                        <Text style= {styles.journalEntryDescription}>{item.description}</Text>
                                    </View>
                                </View>
                        }
                        ItemSeparatorComponent={ItemSeparator}
                        keyExtractor={(item) => item._id}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        journalHistoryRec:
        {
            width: "100%",
            flex: 9,       
        },
        entryContainer:{
            flexDirection: "row", 
            width: "100%",
            height: 100
        },
        journalSeparator:{
        },
        journalEntryDate:{
            flex:1,
            fontSize:17,
            textAlign: 'center',
            color: "#f0faf5",
            fontWeight:"bold"
        },
        journalEntryLocation:{
            fontSize:20,
            fontFamily: "Arial",
            fontWeight: "bold",
            color: "#f0faf5"
        },
        journalEntryDescription:{
            fontFamily: "Arial",
            fontSize:17,
            color: "#f0faf5"
        }
    }
)
