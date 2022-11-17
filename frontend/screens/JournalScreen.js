import * as React from "react";
import {ScrollView, TouchableOpacity, FlatList, View, Text, StyleSheet, Button, Switch, TextInput, Alert } from "react-native";
import { UserNameContext } from "../MainContainer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from "axios";
import ListAccordion from "../../components/ListAccordion";

const ItemSeparator = () => <View style={styles.journalSeparator} />;

let dateColors=["#30483b", "#3b5446"]
let entryColors=["#395144", "#445F50"]

export default function JournalScreen({ navigation }) {
    const username = React.useContext(UserNameContext);
    let [journalsList, setJournalsList] = React.useState([]);

    React.useEffect(() => {
        axios.post( "https://sojourn-user-auth.herokuapp.com/api/readjournals" ,
            {
                username: username,
            }
        )    
        .then(
            (response) => {  
                setJournalsList(response.data.reverse());
            }
        ) 
        .catch(
            (response) => {
                alert(response.response.data);
            }
        )
    }, [])



    return (
        <View style={{paddingTop: "1%", height:"100%", backgroundColor:"white"}}>
            <View style={{width:"100%" ,height:"13%", flexDirection:"row"}}>
                <Text style={{paddingTop:"15%",paddingLeft:"5%", width:"50%",fontSize:22}}>Journals</Text>
                <TouchableOpacity
                    style={{ marginLeft:"36.5%", marginTop:"12%", height:50, width:50 }}
                    activeOpacity={0.3}
                    onPress={() => navigation.navigate("PostJournal",{username:username})}
                >
                <Ionicons color={"#303036"} size={50} name="add-outline" />
                </TouchableOpacity>
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
