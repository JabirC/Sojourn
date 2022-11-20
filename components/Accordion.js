import { View, Text, StyleSheet,  TouchableOpacity} from "react-native";
import React from "react";
import { format } from "date-fns";
import Ionicons from 'react-native-vector-icons/Ionicons';

let dateColors=["#30483b", "#3b5446"]
let entryColors=["#395144", "#445F50"]

export default function Accordion({ locationDate, locationName, locationCity, locationJournal}){
  const [isActive, setIsActive] = React.useState(false);

  return (
    <View>
      <View>
            <TouchableOpacity
                style={{width:"100%" , height: 100,backgroundColor:"black"}}
                activeOpacity={0.7}
                onPress={()=>setIsActive(!isActive)} 
            >
                <View style={{flexDirection:"row", }}>
                    <View style= {{width:"25%", backgroundColor: dateColors[1 % dateColors.length],height: 100, justifyContent: "center", alignItems:"center", flexDirection: "column"}}>
                        <Text style= {styles.journalEntryDate}>{format(new Date(locationDate), "LLL")}</Text>
                        <Text style= {styles.journalEntryDate}>{format(new Date(locationDate), "do")},</Text>
                        <Text style= {styles.journalEntryDate}>{format(new Date(locationDate), "yyyy")}</Text>
                    </View>
                    <View style={{backgroundColor :entryColors[1], width:"25%",flex: 4, flexDirection: "column", justifyContent: "center", alignContent:"center", paddingLeft:"3%"}}>
                        <Text style= {styles.journalEntryLocation}>{locationName}</Text>
                        <Text style= {styles.journalEntryCity}>{locationCity}</Text>
                    </View>
                    <View style={{backgroundColor:entryColors[1], height:100, width:"10%"}}>
                        <View style={styles.expandableIcon}>
                        <Ionicons color={"white"} size={20} name={isActive? "chevron-up" : "chevron-down"} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
      </View>
      {isActive && <View style={{borderBottomColor:"#ECEAEA", borderBottomWidth:1, backgroundColor:"white", width:"100%", height:100}}><Text numberOfLines={4} style={styles.journalText}>{locationJournal}</Text></View>}
    </View>
  );
};




const styles = StyleSheet.create(
    {  journalEntryDate:{
            fontSize:17,
            textAlign: 'center',
            color: "#f0faf5",
        },
        journalEntryLocation:{
            fontSize:20,
            fontFamily: "Arial",
            fontWeight: "bold",
            color: "#f0faf5"
        },
        journalEntryCity:{
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