import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import ItinSearchBar from "../../components/ItinSearchBar.js";
import { UserNameContext } from "../MainContainer";

export default function ItineraryScreen({ navigation }) {
  const username = React.useContext(UserNameContext);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 50,
        paddingHorizontal: 10,
      }}
    >
      <Text
        onPress={() => alert("Placeholder Itinerary screen.")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Itching for a New Trip?{"\n"}
        We can help with that.{"\n"}
        First off, let's see where{"\n"}
        you're starting at.
      </Text>

      <ItinSearchBar placeHolderVal="Hehe"></ItinSearchBar>
      <Text
        onPress={() => console.log("pressed journey text")}
        style={{ fontSize: 26, fontWeight: "bold", paddingTop: 70 }}
      >
        Now, what's your priority for this journey?
      </Text>
      <View style={buttonStyles.container}>
        <View style={buttonStyles.buttonContainer}>
          <Button title="Cost" />
        </View>
        <View style={buttonStyles.buttonContainer}>
          <Button title="Distance" />
        </View>
        <View style={buttonStyles.buttonContainer}>
          <Button title="Similarity" />
        </View>
      </View>
    </View>
  );
}

const buttonStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
