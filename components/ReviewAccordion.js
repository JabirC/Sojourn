import { View, Text, StyleSheet,  TouchableOpacity} from "react-native";
import React from "react";
import { format, set } from "date-fns";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { Rating} from 'react-native-ratings';

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



export default function Accordion({ locationDate, locationName, locationCity, locationJournal, username, votes, rating, loggedInUserName}){
  const [isActive, setIsActive] = React.useState(false);
  const [upVoted, setUpVoted] = React.useState(false);
  const [upVoteColor, setUpVoteColor] = React.useState("white");
  const [downVoted, setDownVoted] = React.useState(false);
  const [downVoteColor, setDownVoteColor] = React.useState("white");
  const [numVotes, setNumVotes] = React.useState(votes);
  const [level, setLevel] = React.useState(0);
    //Each accordion will fetch its own history, or default to no history

    React.useEffect(() => {
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
    }, [])

    React.useEffect(() => {
        axios.post( "https://sojourn-user-auth.herokuapp.com/api/fetchUserExperience" ,
        {
            username:loggedInUserName
        }
        )    
        .then(
            (response) => {  
                setLevel(response.data.level)
            }
        ) 
        .catch(
            (response) => {
                console.log("fail");
                alert(response.response.data);
            }
        )
    }, [])


  function upVote(){
    //If uparrow is white and downarrow is red, make uparrow green and make downarrow white
    if(!upVoted && downVoted){
        attemptVote(loggedInUserName,username,locationName,locationDate,"downToUp");
        setUpVoteColor("lightgreen");
        setUpVoted(true);
        setDownVoteColor("white");
        setDownVoted(false);
        setNumVotes(numVotes+2)
    }
    //If both are white, just make uparrow green
    else if (!upVoted && !downVoted){
        attemptVote(loggedInUserName,username,locationName,locationDate,"noneToUp");
        setUpVoteColor("lightgreen");
        setUpVoted(true);
        setNumVotes(numVotes+1)
    }
    // Else turn the green arrow off
    else{
        attemptVote(loggedInUserName,username,locationName,locationDate,"upToNone");
        setUpVoteColor("white");
        setUpVoted(false);
        setNumVotes(numVotes-1)
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
        setNumVotes(numVotes-2)
    }
    //If both are white, just make downarrow red
    else if (!upVoted && !downVoted){
        attemptVote(loggedInUserName,username,locationName,locationDate,"noneToDown");
        setDownVoteColor("red");
        setDownVoted(true);
        setNumVotes(numVotes-1)
    }
    // Else turn the red arrow off
    else{
        attemptVote(loggedInUserName,username,locationName,locationDate,"downToNone");
        setDownVoteColor("white");
        setDownVoted(false);
        setNumVotes(numVotes+1)
    }
  }

  return (
    <View style={{borderBottomColor:"white", borderBottomWidth:1}}>
        <View>
            <View style={{flexDirection:"row", }}>
                <View style={{backgroundColor :entryColors[1], width:"25%",flex: 4, flexDirection: "column", paddingTop:"3%", alignContent:"center", paddingLeft:"3%"}}>
                    <View style={{flexDirection:"row"}}>
                    <View style={{width:35,height:35,borderRadius:35, borderColor:"white", borderWidth:3, marginRight:"2%", justifyContent: 'center', alignItems: 'center'}}><Text style={{color:"gold",fontSize:18}}>{level}</Text></View>
                    <Text style= {styles.username}>{username}</Text>
                    </View>
                    <View>
                        <Rating
                        style={{ marginTop:"1%", marginBottom:"1%", marginRight:"60%"}}
                        type='star'
                        ratingCount={5}
                        tintColor={entryColors[1]}
                        imageSize={25}
                        startingValue={rating}
                        readonly = {true}
                    /></View>

                    <Text numberOfLines={15} style= {{fontSize:17, color:"#f0faf5", marginBottom:"4%"}}>{locationJournal}</Text>
                </View>


            {/* Moris you will make changes under here  */}
                <View style= {{width:"20%",backgroundColor: dateColors[1 % dateColors.length],height: "100%", justifyContent: "center", alignItems:"center", flexDirection: "column"}}>
                    {/* Upvote Icon */}
                    <TouchableOpacity onPress={() => upVote()}>
                            <Ionicons color={upVoteColor} size={25} name= "chevron-up"/>
                    </TouchableOpacity>

                    {/* Vote Count */}
                    <Text style= {styles.voteCount}>{numVotes}</Text>

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
            fontWeight: "bold",
            color: "yellow",
            marginTop:"2%"
        },
        locationJournal:{
            fontSize:17,
            color: "#f0faf5"
        },
        journalText:{
            flex:1,
            flexWrap: 'wrap',
            fontSize:17,
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