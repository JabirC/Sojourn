import { View} from "react-native";
import React from "react";
import Accordion from "./Accordion";


export default function ListAccordion({ data }){
    return(
        <View style={{height:"100%", width:"100%"}}> 
            {data.map(({ _id, locationName, description, date, privateEntry, custom}) => (
                <Accordion key={_id} locationDate={date} locationName={locationName} locationCity="NYC" locationJournal= {description} customPost={custom}></Accordion>
             ))}
        </View>
    );
};