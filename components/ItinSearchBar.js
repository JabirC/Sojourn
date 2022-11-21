import * as React from "react";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";

export default function ItinSearchBar({ placeHolderVal }) {
  let [search, setSearch] = React.useState("");

  return (
    <SearchBar
      placeholder={placeHolderVal}
      onChangeText={setSearch}
      value={search}
    />
  );
}
