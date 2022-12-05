import { View, Text, StyleSheet,  TouchableOpacity} from "react-native";
import React from "react";
import { format } from "date-fns";
import Ionicons from 'react-native-vector-icons/Ionicons';

let dateColors=["#30483b", "#3b5446"]
let entryColors=["#395144", "#445F50"]

export default function Accordion({ locationDate, locationName, locationCity, locationJournal, username, votes}){
  const [isActive, setIsActive] = React.useState(false);

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
                        <TouchableOpacity>
                             <Ionicons color={"white"} size={25} name= "chevron-up" />
                        </TouchableOpacity>

                        {/* Vote Count */}
                        <Text style= {styles.voteCount}>{votes}</Text>

                        {/* Downvote Icon */}
                        <TouchableOpacity>
                             <Ionicons color={"white"} size={25} name="chevron-down" />
                        </TouchableOpacity>
                    </View>


                

                </View>
      </View>
    </View>
  );
};




const styles = StyleSheet.create(
    {  voteCount:{
            fontSize:17,
            textAlign: 'center',
            color: "orange",
        },
        username:{
            fontSize:18,
            fontFamily: "Arial",
            fontWeight: "bold",
            color: "yellow"
        },
        locationJournal:{
            fontFamily: "Arial",
            fontSize:17,
            color: "#f0faf5"
        },
        journalText:{
            flex:1,
            flexWrap: 'wrap',
            fontSize:17,
            fontFamily: "Arial",
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