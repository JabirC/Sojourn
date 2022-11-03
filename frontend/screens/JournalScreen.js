import * as React from "react";
import { FlatList, View, Text, StyleSheet, Button, Switch, TextInput, Alert } from "react-native";
import JournalEntry from "../components/JournalEntry";
import axios from "axios";

let boxWidth = "90%"

const ItemSeparator = () => <View style={styles.journalSeparator} />;

export default function JournalScreen({ navigation }) {
    let [journalsList, setJournalsList] = React.useState([]);
    let [newPost, setNewPost] = React.useState(0); 
    React.useEffect(() => {
        axios.post( "https://sojourn-user-auth.herokuapp.com/api/readjournals" ,
            {
                username: 'testing1234',
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
        <View>
            {/* Location Entry */}
            {/* Entry Writing Space */}
            {/* Post Button */}
            <JournalEntry/>

            <View style = {styles.journalHistoryRec}>
                <View>
                    <FlatList 
                        data={journalsList}
                        renderItem={({ item }) => 
                            <View>
                                <Text style= {styles.journalEntryLocation}>{item.locationName}</Text>
                                <Text style= {styles.journalEntryDescription}>{item.description}</Text>
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
    {   journalHistoryRec:
        {
            width: boxWidth,
            height: "50%",
            marginTop: "10%",
            paddingTop:"30%"
        },
        journalSeparator:{
            paddingBottom:"10%"
        },
        journalEntryLocation:{
            fontSize:17,
            fontFamily: "Arial",
            fontWeight: "bold",
        },
        journalEntryDescription:{
            fontFamily: "Arial",
            fontSize:17
        }
    }
)
