import * as React from "react";
import { View,Text} from "react-native";
import SearchBar from "../../components/SearchBar";



export default function ItineraryScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 50}}>
            <Text
                onPress={() => alert('Placeholder Itinerary screen.')}
                style={{ fontSize: 26, fontWeight: 'bold'}}>
                    
                
                Itching for a New Trip?{'\n'}
                We can help with that.{'\n'}
                First off, let's see where{'\n'}
                you're starting at.
            </Text>
            <Text
                onPress={() => alert('Placeholder Search bar')}
                style={{ fontSize: 26, fontWeight: 'bold', paddingTop: 50}}>
                
                Search Bar Placeholder
            </Text>
            <SearchBar
                 onPress={() => alert('Search bar component')}>
                
            </SearchBar>
        </View>
    );
}