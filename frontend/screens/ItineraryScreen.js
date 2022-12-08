import React, { useState, useEffect } from "react";
import {Platform, StatusBar} from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { Button, ListItem } from "react-native-elements";
import ItinSearchBar from "../../components/ItinSearchBar.js";
import { UserNameContext } from "../MainContainer";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ItineraryScreen({ navigation }) {
  const username = React.useContext(UserNameContext);
  const [filteredLocations, setFilteredLocations] = React.useState([]);
  const [masterLocations, setMasterLocations] = React.useState([]);
  const [search, setSearch] = React.useState("");
  // let [statevar, functhatchangestahtstatevar] = React.useState([])
  React.useEffect(() => {
    axios
      .post("https://sojourn-user-auth.herokuapp.com/api/getLocations", {
        query: "ALL",
      })
      .then((response) => {
        // console.log(masterLocations);
        setMasterLocations(response.data);
      })
      .catch((response) => {
        alert(response.response.data);
      });
  }, []);

  const searchFilter = (text) => {
    console.log(text);
    if (text) {
      // this search filter needs to be fixed
      const newLocations = masterLocations.filter((item) => {
        // const itemData = item.NAME; this line not needed for us
        const textData = text.toUpperCase();
        //ISSUE: filter for non alphabet symbols $% reject them if they show up
        console.log(textData.toLowerCase());
        // console.log(textData);
        // console.log(item.NAME.indexOf(textData));
        return item.NAME.indexOf(textData) > -1;
      });
      setFilteredLocations(newLocations);
      setSearch(text);
    } else {
      setFilteredLocations(masterLocations);
      setSearch(text);
    }
  };

  const locSelectHandler = ({ item }) => {
    // ISSUE console.log("teehee" + item.NAME); item.NAME not being passed up
    // console.log("an item was pressed");
  };

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        // onPress={(item) => locSelectHandler(item)}
        // ISSUE: event handling not working
        onPress={() => console.log("pressed: " + item.NAME)}
      >
        <Text
          style={{
            fontSize: 16,
            // fontWeight: "bold",
          }}
        >
          {item.NAME}
        </Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View style={{ paddingBottom: "1%", backgroundColor: "lightgray" }} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ****TOP QUESTIONS**** */}
      <View
        style={{
          flex: 1,
          // backgroundColor: "lightblue",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", paddingTop: "10%" }}>
          Itching for a New Trip?
        </Text>
        <Text style={{ fontSize: 26, fontWeight: "bold", paddingTop: "5%" }}>
          We can help with that!
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            paddingTop: "10%",
            // paddingBottom: "5%",
            textAlign: "center",
          }}
        >
          Please enter your start location:
        </Text>
      </View>

      {/* ****SEARCH BAR**** */}
      <View style={styles.searchBarStyles}>
        {/* <ItinSearchBar placeHolderVal="Enter Location Here"></ItinSearchBar> */}
        <TextInput
          style={styles.textInputStyle}
          value={search}
          // ISSUE: make the selected item's name become the placeholder text so the user knows what
          placeholder={"Enter Location Here..."}
          // placeholder={item.NAME}
          onChangeText={(text) => searchFilter(text)}
        />

        <FlatList
          data={filteredLocations}
          renderItem={ItemView}
          ItemSeparatorComponent={ItemSeparatorView}
          keyExtractor={(item) => item._id}
        />
      </View>

      {/* ****LOCATION COUNT**** */}
      <View style={styles.locCount}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Select number of locations:
        </Text>
        {/* ISSUE: Just do a dropdown menu instead */}
        <TouchableOpacity
          onPress={() => console.log("Location counter placeholder")}
        >
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>#</Text>
        </TouchableOpacity>
      </View>

      {/* ****BUTTON AREA**** */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          // backgroundColor: "red",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          Now, what's your priority for this trip?
        </Text>
        {/* ***Buttons Are Here*** */}
        <View style={styles.buttonView}>
          {/* BUTTON 1: COST */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => console.log("Cost pressed")}
          >
            {/* will likely need to make it similar to the tab bar icon set up in maincontainer.js but leaving it as just icons for now */}
            <Ionicons name={"cash-outline"} size={100} />
            <Text style={styles.textStyle}>Cost</Text>
          </TouchableOpacity>

          {/* BUTTON 2: DISTANCE */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => console.log("Distance pressed")}
          >
            <Ionicons name={"airplane-outline"} size={100} />
            <Text style={styles.textStyle}>Distance</Text>
          </TouchableOpacity>

          {/* BUTTON 3: SIMILARITY */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => console.log("Similarity pressed")}
          >
            <Ionicons name={"git-branch-outline"} size={100} />
            <Text style={styles.textStyle}>Similarity</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0
    // backgroundColor: "lightgreen",
  },
  buttonView: {
    // for the overall view that contains all buttons
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "turquoise",
  },
  buttonContainer: {
    // contains each individual touchable opacity
    flex: 1,
    // backgroundColor: "powderblue",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemStyle: {
    paddingLeft: "1%",
    backgroundColor: "darkgray",
  },
  textInputStyle: {
    height: 40,
    //borderWidth: "1%", //THIS LINE CAUSES CRASH ON ANDROID -TESS 12/7/22
    alignSelf: "stretch",
    paddingHorizontal: "2%",
    // borderColor: "yellow",
    backgroundColor: "white",
  },
  flatListStyles: {
    flex: 1,
    backgroundColor: "green",
  },
  searchBarStyles: {
    //for the whole view containing textinput and flatlist
    flex: 1,
    // backgroundColor: "pink",
    alignSelf: "stretch",
    paddingHorizontal: "1%",
  },
  locCount: {
    flex: 0.5,
    // backgroundColor: "yellow",
    alignSelf: "stretch",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
