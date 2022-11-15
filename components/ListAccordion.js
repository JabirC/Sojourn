import { View, Text, StyleSheet,  TouchableOpacity} from "react-native";
import React from "react";
import Accordion from "./Accordion";


export default function ListAccordion({ data }){
    return(
        <View style={{height:"100%", width:"100%"}}> 
            {data.map(({ _id, locationName, description, date, privateEntry}) => (
                <Accordion key={_id} locationDate={date} locationName={locationName} locationCity="NYC" locationJournal= {description}></Accordion>
             ))}
        </View>
    );
};