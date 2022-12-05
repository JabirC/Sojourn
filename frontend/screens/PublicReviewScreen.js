import * as React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import ReviewListAccordion from "../../components/ReviewListAccordion";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function PublicReviewScreen({ route, navigation }) {
    let [journalsList, setJournalsList] = React.useState([]);

    React.useEffect(() => {
        axios.post( "https://sojourn-user-auth.herokuapp.com/api/fetchLocationPublicJournals" ,
            {
                locationName: "ING CAFE",
            }
        )    
        .then(
            (response) => {  
                console.log(response.data);
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
        <View style = {{flex: 1, alignItems: 'center', marginTop: "20%"}}>
        {/* Go Back */}
        <TouchableOpacity onPress={() => navigation.goBack()} style = {{alignSelf:"flex-start",position:"absolute",marginLeft:"5%",marginTop:"1.5%"}}>
            <Ionicons name={"chevron-back-circle"} size={50} color={"black"}/>
        </TouchableOpacity>
        
        <Text style = {styles.header}>
            Reviews
        </Text>
        <ScrollView style = {styles.journalHistoryRec}>
                <ReviewListAccordion data={journalsList}></ReviewListAccordion>
        </ScrollView>
        </View>
    );
}





const styles = StyleSheet.create({
    header:{
        fontSize: 45, 
        fontWeight: 'bold',
        textAlign:"center",
        marginBottom:"5%"
    },
    resetPass:{
        marginTop: "5%",
        fontSize: 20,
        fontWeight: "bold"
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
        paddingTop:windowWidth*.02,
        paddingBottom:windowWidth*.02,
    },
    touchableSignOutOuterLayer:{
        marginLeft:"7.5%",
        marginTop:windowWidth*1.73,
        width:windowWidth*1.1,
        position:"absolute",
        borderTopWidth:1,
        borderTopColor:"grey"
    },
    touchableSignOutTextLayer:{
        fontWeight:"bold",
        color:"red",
        textAlign:"center",
        fontSize:18,
        paddingTop:windowWidth*.02,
        paddingBottom:windowWidth*.02,  
    },
    journalHistoryRec:
        {
            width: "100%",
            height: "85%",
        },
});