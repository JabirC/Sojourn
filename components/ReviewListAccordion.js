import { View} from "react-native";
import React from "react";
import ReviewAccordion from "./ReviewAccordion";


export default function ListAccordion({ data }){
    return(
        <View style={{height:"100%", width:"100%"}}> 
            {data.map(({ _id, locationName, description, date, privateEntry, username, votes}) => (
                <ReviewAccordion key={_id} locationDate={date} locationName={locationName} locationCity="NYC" locationJournal= {description} username={username} votes={votes}></ReviewAccordion>
             ))}
        </View>
    );
};