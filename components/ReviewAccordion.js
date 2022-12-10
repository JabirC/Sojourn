import { View, Text, StyleSheet,  TouchableOpacity} from "react-native";
import React from "react";
import { format } from "date-fns";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";

let dateColors=["#30483b", "#3b5446"]
let entryColors=["#395144", "#445F50"]

function attemptVote(loggedInUserName, creatorUsername, locationName, date, action ){
    axios.post( "https://sojourn-user-auth.herokuapp.com/api/vote" ,
        {
            username:loggedInUserName,
            creatorUsername: creatorUsername,
            locationName: locationName,
            date: date,
            action: action
        }
    )    
    .then(
        (response) => {  
            console.log("success");
            console.log(response.data);
        }
    ) 
    .catch(
        (response) => {
            console.log("fail");
            alert(response.response.data);
        }
    )
}



export default function Accordion({ locationDate, locationName, locationCity, locationJournal, username, votes, loggedInUserName}){
  const [isActive, setIsActive] = React.useState(false);
  const [upVoted, setUpVoted] = React.useState(false);
  const [upVoteColor, setUpVoteColor] = React.useState("white");
  const [downVoted, setDownVoted] = React.useState(false);
  const [downVoteColor, setDownVoteColor] = React.useState("white");

    //Each accordion will fetch its own history, or default to no history
    axios.post( "https://sojourn-user-auth.herokuapp.com/api/fetchVoteHistory" ,
        {
            username:loggedInUserName,
            creatorUsername: username,
            locationName: locationName,
            date: locationDate,
        }
    )    
    .then(
        (response) => {  
            console.log("success");
            console.log(response.data);

            if(response.data.voteStatus == "upVote"){
                setUpVoteColor("lightgreen");
                setUpVoted(true);
                setDownVoteColor("white");
                setDownVoted(false);
            }
            else if(response.data.voteStatus == "downVote"){
                setDownVoteColor("red");
                setDownVoted(true);
                setUpVoteColor("white");
                setUpVoted(false);
            }
            else{
                setDownVoteColor("white");
                setDownVoted(false);
                setUpVoteColor("white");
                setUpVoted(false);
            }
        }
    ) 
    .catch(
        (response) => {
            console.log("fail");
            alert(response.response.data);
        }
    )

    

  function upVote(){
    //If uparrow is white and downarrow is red, make uparrow green and make downarrow white
    if(!upVoted && downVoted){
        attemptVote(loggedInUserName,username,locationName,locationDate,"downToUp");
        setUpVoteColor("lightgreen");
        setUpVoted(true);
        setDownVoteColor("white");
        setDownVoted(false);
    }
    //If both are white, just make uparrow green
    else if (!upVoted && !downVoted){
        attemptVote(loggedInUserName,username,locationName,locationDate,"noneToUp");
        setUpVoteColor("lightgreen");
        setUpVoted(true);
    }
    // Else turn the green arrow off
    else{
        attemptVote(loggedInUserName,username,locationName,locationDate,"upToNone");
        setUpVoteColor("white");
        setUpVoted(false);
    }
  }

  function downVote(){
    //If downarrow is white and uparrow is green, make downarrow red and make uparrow white
    if(upVoted && !downVoted){
        attemptVote(loggedInUserName,username,locationName,locationDate,"upToDown");
        setDownVoteColor("red");
        setDownVoted(true);
        setUpVoteColor("white");
        setUpVoted(false);
    }
    //If both are white, just make downarrow red
    else if (!upVoted && !downVoted){
        attemptVote(loggedInUserName,username,locationName,locationDate,"noneToDown");
        setDownVoteColor("red");
        setDownVoted(true);
    }
    // Else turn the red arrow off
    else{
        attemptVote(loggedInUserName,username,locationName,locationDate,"downToNone");
        setDownVoteColor("white");
        setDownVoted(false);
    }
  }

  return (
    <View style={{borderBottomColor:"white", borderBottomWidth:1}}>
        <View>
            <View style={{flexDirection:"row", }}>
                <View style={{backgroundColor :entryColors[1], width:"25%",flex: 4, flexDirection: "column", paddingTop:"3%", alignContent:"center", paddingLeft:"3%"}}>
                    <Text style= {styles.username}>{username}</Text>
                    <Text style= {styles.locationJournal}>{locationJournal}</Text>
                </View>


            {/* Moris you will make changes under here  */}
                <View style= {{width:"20%", backgroundColor: dateColors[1 % dateColors.length],height: 100, justifyContent: "center", alignItems:"center", flexDirection: "column"}}>
                    {/* Upvote Icon */}
                    <TouchableOpacity onPress={() => upVote()}>
                            <Ionicons color={upVoteColor} size={25} name= "chevron-up"/>
                    </TouchableOpacity>

                    {/* Vote Count */}
                    <Text style= {styles.voteCount}>{votes}</Text>

                    {/* Downvote Icon */}
                    <TouchableOpacity onPress={() => downVote()}>
                            <Ionicons color={downVoteColor} size={25} name="chevron-down" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  );
};




const styles = StyleSheet.create(
    {  voteCount:{
            fontSize:20,
            textAlign: 'center',
            color: "orange",
        },
        username:{
            fontSize:18,
            //fontFamily: "Arial",
            fontWeight: "bold",
            color: "yellow"
        },
        locationJournal:{
            //fontFamily: "Arial",
            fontSize:17,
            color: "#f0faf5"
        },
        journalText:{
            flex:1,
            flexWrap: 'wrap',
            fontSize:17,
            //fontFamily: "Arial",
            paddingLeft:"3%",
            paddingTop:"3%",
            paddingRight:"3%"
        },
        expandableIcon:{
            marginTop:"100%",
            height:25,
            width:25
        }
    }
)