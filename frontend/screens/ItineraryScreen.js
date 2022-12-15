import React, { useState, useEffect } from "react";
import ModalDropdown from "react-native-modal-dropdown";
import Animated, {
  FadeInDown,
  Layout,
  LightSpeedInLeft,
  Transition,
} from "react-native-reanimated";
import {
  Platform,
  StatusBar,
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
import ItineraryGenScreen from "./ItineraryGenScreen.js";

export default function ItineraryScreen({ route, navigation }) {
  const username = React.useContext(UserNameContext);
  const [filteredLocations, setFilteredLocations] = React.useState([]);
  const [masterLocations, setMasterLocations] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const [origin, setOrigin] = React.useState({});
  const [destinationNum, setDestinationNum] = React.useState(1);
  const [priority, setPriority] = React.useState("cost");

  const [costState, setCostState] = React.useState(true);
  const [distState, setDistState] = React.useState(false);
  const [simState, setSimState] = React.useState(false);

  const [displayOrigin, setDisplayOrigin] = React.useState("");
  const options = ["1", "2", "3", "4", "5"];
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
    //console.log(text);
    if (text) {
      // this search filter needs to be fixed
      const newLocations = masterLocations.filter((item) => {
        // const itemData = item.NAME; this line not needed for us
        const textData = text.toUpperCase();
        //ISSUE: filter for non alphabet symbols $% reject them if they show up
        //console.log(textData.toLowerCase());
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

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        onPress={() => {
          setOrigin(item);
          //   ,console
          //     .log
          //     // "item pressed is:" + item + "\n origin is:" + origin
          //     // item
          //     ();
        }}
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
            paddingTop: "5%",
            textAlign: "center",
          }}
        >
          Please Select a Start Location:
        </Text>
      </View>

      {/* ****SEARCH BAR**** */}
      <View style={styles.searchBarStyles}>
        <Text style={styles.textStyle}>{"Selected: " + origin.NAME}</Text>
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
      <View
        // entering={FadeInDown}
        // layout={Layout.springify()}
        style={styles.locCount}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          Select number of additional destinations:
        </Text>
        <ModalDropdown
          textStyle={{ fontSize: 40, fontWeight: "bold" }}
          dropdownStyle={{ flex: 1, width: "10%" }}
          defaultValue={destinationNum.toString()}
          isFullWidth={true}
          options={options}
          onSelect={(index) => {
            setDestinationNum(index + 1);
          }}
        />
      </View>

      {/* ****BUTTON AREA**** */}
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>
          Now, what's your priority for this trip?
        </Text>
        {/* ***Buttons Are Here*** */}
        <View style={styles.buttonView}>
          {/* BUTTON 1: COST */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setPriority("cost");
              setCostState(!costState);
              setDistState(false);
              setSimState(false);
            }}
          >
            {/* will likely need to make it similar to the tab bar icon set up in maincontainer.js but leaving it as just icons for now */}
            {!costState && <Ionicons name={"cash-outline"} size={75} />}
            {costState && <Ionicons name={"cash"} size={75} />}
            <Text style={styles.textStyle}>Cost</Text>
          </TouchableOpacity>

          {/* BUTTON 2: DISTANCE */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setPriority("distance");
              setCostState(false);
              setDistState(!distState);
              setSimState(false);
            }}
          >
            {!distState && <Ionicons name={"airplane-outline"} size={75} />}
            {distState && <Ionicons name={"airplane"} size={75} />}
            <Text style={styles.textStyle}>Distance</Text>
          </TouchableOpacity>

          {/* BUTTON 3: SIMILARITY */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setPriority("similarity");
              setCostState(false);
              setDistState(false);
              setSimState(!simState);
            }}
          >
            {!simState && <Ionicons name={"git-branch-outline"} size={75} />}
            {simState && <Ionicons name={"git-branch"} size={75} />}
            <Text style={styles.textStyle}>Similarity</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* GENERATOR VIEW */}
      <View style={styles.buttonGeneratorView}>
        <TouchableOpacity
          style={styles.buttonContainer}
          // onPress={() => console.log(destinationNum)}
          onPress={() => {
            // console.log(origin);
            // console.log(masterLocations);
            // console.log(priority);
            if (
              Object.keys(origin).length == 0 ||
              (costState == false && distState == false && simState == false)
            ) {
              if (Object.keys(origin).length == 0) {
                alert("Please Select a Start Location");
              } else {
                alert("Please Select a Priority for Your Trip");
              }
            } else {
              // alert("origin is defined " + origin.NAME);
              navigation.navigate("ItineraryGenScreen", {
                origin: origin,
                destinationNum: destinationNum,
                priority: priority,
                masterLocations: masterLocations,
              });
            }
          }} //sconsole.log("Origin: " + origin.NAME + "\n Number of Destinations: " + destinationNum + "\n Priority: " + priority)}
        >
          <Ionicons name={"rocket-outline"} size={35} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Generate!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
  buttonGeneratorView: {
    // for the overall view that contains all buttons
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "turquoise",
  },
  textStyle: {
    fontSize: 20,
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
    // paddingTop: "10%",
  },
  locCount: {
    flex: 0.5,
    // backgroundColor: "pink",
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    // paddingBottom: "5%",
  },
});
