import * as React from "react";
import { View,Text } from "react-native";

export default function JournalScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('Placeholder Journal screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>
                    
                
                Journal Screen
            </Text>
        </View>
    );
}