import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
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
    if (text) {
      // this search filter needs to be fixed
      const newLocations = masterLocations.filter((item) => {
        const itemData = item.NAME;
        const textData = text.toUpperCase();
        return item.NAME.indexOf(textData) != "";
      });
      setFilteredLocations(newLocations);
      setSearch(text);
    } else {
      setFilteredLocations(masterLocations);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // COME BACK HERE LATER::: !!!!!!!! theres an issue with the itemStyle thing
      <TouchableOpacity styles={styles.itemStyle}>
        <Text>{item.NAME}</Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View style={{ paddingBottom: "1%", backgroundColor: "lightblue" }} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ****TOP THIRD OF SCREEN**** */}
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
            paddingBottom: "5%",
            textAlign: "center",
          }}
        >
          Please enter your start location:
        </Text>
      </View>

      {/* ****SEARCH BAR**** */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "pink",
        }}
      >
        {/* <ItinSearchBar placeHolderVal="Enter Location Here"></ItinSearchBar> */}
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder={"Enter Location Here..."}
          onChangeText={(text) => searchFilter(text)}
        />
        <FlatList
          data={filteredLocations}
          renderItem={ItemView}
          ItemSeparatorComponent={ItemSeparatorView}
          keyExtractor={(item) => item._id}
        />
      </View>

      {/* ****BOTTOM THIRD OF SCREEN**** */}
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
            // onPress={console.log([masterLocations, "hehe"])}
          >
            {/* will likely need to make it similar to the tab bar icon set up in maincontainer.js but leaving it as just icons for now */}
            <Ionicons name={"cash-outline"} size={100} />
            <Text style={styles.textStyle}>Cost</Text>
          </TouchableOpacity>

          {/* BUTTON 2: DISTANCE */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={console.log("ahaha")}
          >
            <Ionicons name={"airplane-outline"} size={100} />
            <Text style={styles.textStyle}>Distance</Text>
          </TouchableOpacity>

          {/* BUTTON 3: SIMILARITY */}
          <TouchableOpacity style={styles.buttonContainer}>
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
    textAlig: "center",
  },
  itemStyle: {
    paddingLeft: 10,
    backgroundColor: "purple",
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "yellow",
    backgroundColor: "white",
    width: 300, //come back to this
  },
});
