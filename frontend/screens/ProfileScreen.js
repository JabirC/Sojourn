import * as React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from "react-native";
import { UserNameContext } from "../MainContainer";
import CircularProgress from "react-native-circular-progress-indicator";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
// console.log(UserNameContext);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function comparator(low,high,num){
    return low <= num && num <= high;
}

function determineBadgeColor(num){
    //Red: 1-21
    if (comparator(1,21,num)){
        return "#cd7f32";
    }
    //Yellow: 22-78
    else if (comparator(22,78,num)){
        return "#AFAFAF";
    }
    //Green 79+
    else{
        return "#b29700";
    }
};

function determineBadgeIcon(num){
    var iconsize = 75;
    //ios-body-outline: 1-2,28-35,91-104
    if (comparator(1,2,num) || comparator(28,35,num) || comparator(91,104,num)){
        return <Ionicons name={"ios-body-outline"} size={iconsize} color={determineBadgeColor(num)} style= {{alignSelf:"center"}} />                            
    }
    //ios-body: 3-5,36-44,105-119
    if (comparator(3,5,num) || comparator(36,44,num) || comparator(105,119,num)){
        return <Ionicons name={"ios-body"} size={iconsize} color={determineBadgeColor(num)} style= {{alignSelf:"center"}} />                            
    }
    //car-outline: 6-9,45-54,120-135
    if (comparator(6,9,num) || comparator(45,54,num) || comparator(120,135,num)){
        return <Ionicons name={"car-outline"} size={iconsize} color={determineBadgeColor(num)} style= {{alignSelf:"center"}} />                            
    }
    //car: 10-14,55-65,136-152
    if (comparator(10,14,num) || comparator(55,65,num) || comparator(136,152,num)){
        return <Ionicons name={"car"} size={iconsize} color={determineBadgeColor(num)} style= {{alignSelf:"center"}} />                            
    }
    //car-sport-outline:15-21,66-77,153-170
    if (comparator(15,21,num) || comparator(66,77,num) || comparator(153,170,num)){
        return <Ionicons name={"car-sport-outline"} size={iconsize} color={determineBadgeColor(num)} style= {{alignSelf:"center"}} />                            
    }
    //car-sport:21-27,78-90,171+
    if (comparator(21,27,num) || comparator(78,90,num) || num > 170){
        return <Ionicons name={"car-sport"} size={iconsize} color={determineBadgeColor(num)} style= {{alignSelf:"center"}} />                            
    }
    
    return <Ionicons name={"sad-outline"} size={iconsize}  style= {{alignSelf:"center"}} />                            
};


export default function ProfileScreen({ route, navigation }) {
    const username = React.useContext(UserNameContext);
    const [currentExperience, setCurrentExperience] = React.useState(0);
    const [experienceNeeded, setExperienceNeeded] = React.useState(0);
    const [level, setLevel] = React.useState("0");
    const [numberJournalsPosted, setNumberJournalsPosted] = React.useState(0);
    const [numberLocationsVisited, setNumberLocationsVisited] = React.useState(0);
    const [numberNewCitiesVisited, setNumberNewCitiesVisited] = React.useState(0);
    // const username = "mogoo";
    console.log(username);
    const isFocused = useIsFocused();
    let exp;

    React.useEffect(() => {
        //Activate only if focused on the Profile page, isFocused can change to False which would trigger the effect
        if(isFocused){
            axios.post( "http://sojourn-user-auth.herokuapp.com/api/fetchUserExperience" ,
                {
                    username: username,
                }
            )    
            .then(
                (response) => {  
                    console.log("SUCCESS");
                    console.log(response.data);
                    //APPARENTLY: having experienceNeeded set after currentExperience messes up the circular progress indicator, but switching the order fixes it
                    //This is a new occurrence that never happened before
                    setExperienceNeeded(response.data.experienceNeeded);
                    setCurrentExperience(response.data.currentExperience);
                    setLevel(response.data.level);
                    setNumberJournalsPosted(response.data.numberJournalsPosted)
                    setNumberLocationsVisited(response.data.numberLocationsVisited)
                    setNumberNewCitiesVisited(response.data.numberNewCitiesVisited)
                }
            ) 
            .catch(
                (response) => {
                    console.log("FAIL");
                    console.log(response);
                    setCurrentExperience(0);
                    setExperienceNeeded(0);
                    setLevel(0);
                }
            )
        }
    }, [isFocused]);

    // https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg some default person pic
    return (
        <View >
            {/* Chunk of color on top above all elements */}
            <View style={styles.header}></View>
            
            {/* Level/Progress with Icon and Username Displayed */}
            <View style = {{flexDirection:"row",marginBottom:-windowWidth*.05}}>
                <View style = {{marginLeft:"5%", flex:4, marginBottom:"5%"}}>
                    <CircularProgress
                    value = {currentExperience} 
                    maxValue= {experienceNeeded}
                    style = {styles.progressBar} 
                    radius = {windowWidth*.215} 
                    activeStrokeWidth = {windowWidth*.05}
                    // inActiveStrokeWidth = {10}
                    // inActiveStrokeColor = {"grey"}
                    inActiveStrokeOpacity = {0}
                    showProgressValue = {false}
                    />
                    <Image style={styles.avatar} source={{uri: 'https://external-preview.redd.it/rnXjiMV7IreZzyuNoOjQHT8SeqDl1rUOvefO_79SRDo.jpg?width=640&crop=smart&auto=webp&s=951482ad059a0c34da568289fa34a7fd1e9fc171'}}/>
                </View>

                {/* Display Username and Level */}
                <View style = {{flex:2.5, paddingTop:"13.5%"}}>
                    <Text style = {{fontSize:20, fontWeight:"bold"}}>
                        {username}                                            
                    </Text>
                    <Text style = {{fontSize:20, fontWeight:"bold",color:"#2ecc71"}}>
                        {"Level " + level}                                            
                    </Text>
                </View>

                {/* Settings */}
                <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen",{username:username})} style = {{flex:1.25,height:"30%"}}>
                    <Ionicons name={"settings"} size={35} color={"black"}/>
                </TouchableOpacity>
                
            </View>

            {/* Experience indicator via text */}
            <View style = {{flexDirection:"row"}}>
                <Text style = {{fontSize:20, fontWeight:"bold", color:"#2ecc71",textAlign:"center",width:windowWidth*.2,textAlign:"right",marginLeft:windowWidth*.05}}>
                    {currentExperience}
                </Text>

                <Text style = {{fontSize:20, fontWeight:"bold", color:"#2ecc71",textAlign:"center",width:windowWidth*.03}}>
                    {"/"}
                </Text>

                <Text style = {{fontSize:20, fontWeight:"bold", color:"#2ecc71",textAlign:"center",width:windowWidth*.2,textAlign:"left"}}>
                    {experienceNeeded}
                </Text>
            </View>
            
            
            {/* Badges */}
            <Text style = {{fontSize:35, fontWeight:"bold",marginLeft:"5%",marginTop:"5%",textAlign:"center"}}>
                Badges
            </Text>

            <View style = {{borderColor:"blue",borderWidth:5,height:windowHeight*.3, width:windowWidth*.9, marginLeft:"5%", marginBottom:"5%",marginTop:"5%",flexDirection:"row"}}>
                <View style = {{width:windowWidth*.3}}>
                    <Text style = {{fontSize:25, fontWeight:"bold", textAlign:"center"}}>
                        Public Journals Posted 
                    </Text>
                    <Text style = {{fontSize:25, fontWeight:"bold", textAlign:"center"}}>
                        {numberJournalsPosted} 
                    </Text>   
                    {determineBadgeIcon(numberJournalsPosted)}
                </View>                            
                <View style = {{width:windowWidth*.3}}>
                    <Text style = {{fontSize:25, fontWeight:"bold", textAlign:"center"}}>
                        New Locations Visited 
                    </Text>
                    <Text style = {{fontSize:25, fontWeight:"bold", textAlign:"center"}}>
                        {numberLocationsVisited} 
                    </Text>   
                    {determineBadgeIcon(numberLocationsVisited)}
                </View>                
                <View style = {{width:windowWidth*.25}}>
                    <Text style = {{fontSize:25, fontWeight:"bold", textAlign:"center"}}>
                        New Cities Visited 
                    </Text>        
                    <Text style = {{fontSize:25, fontWeight:"bold", textAlign:"center"}}>
                        {numberNewCitiesVisited} 
                    </Text>   
                    {determineBadgeIcon(numberNewCitiesVisited)}
                </View>                

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#0000FF",
    height:windowHeight*.2,
    marginBottom: "5%",
    marginTop:"7%"
  },
  progressBar:{
    position:"absolute",
  },
  avatar: {
    width: windowWidth*.3,
    height: windowWidth*.3,
    borderRadius: 1000, //if this is too small (<100 apparently), can make the circle became oval ish 
    borderWidth: 5,
    borderColor: "grey",
    marginTop:windowWidth*.065,
    marginLeft:windowWidth*.065,
    position: 'absolute',
  },
  
});