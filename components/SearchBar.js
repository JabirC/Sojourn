import React from "react";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";

export default class App extends React.Component {
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Enter Location Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}
