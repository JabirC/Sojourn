import * as React from "react";
import {ScrollView, FlatList, View, Text, StyleSheet, Button, Switch, TextInput, Alert } from "react-native";
import { UserNameContext } from "../MainContainer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from "axios";
import { format } from "date-fns";
import Accordion from "../../components/Accordion";
import ListAccordion from "../../components/listAccordion";

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
        <View style={{paddingTop: "10%", height:"100%", backgroundColor:"white"}}>
            <View style={{height:"15%"}}>

            </View>
            <ScrollView style = {styles.journalHistoryRec}>
                <ListAccordion data={journalsList}></ListAccordion>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        journalHistoryRec:
        {
            width: "100%",
            height: "85%",
        }
    }
)
