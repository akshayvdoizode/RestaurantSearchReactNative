import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

import yelp from "../api/yelp";
const ResultsShow = ({ navigation }) => {
  const id = navigation.getParam("id");
  const [result, setResult] = React.useState(null);
  //   console.log(id, result);
  const getResults = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  React.useEffect(() => {
    getResults(id);
  }, []);
  if (!result) {
    return null;
  }
  return (
    <View>
      <Text style={Styles.text}>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image source={{ uri: item }} style={Styles.image} />;
        }}
      />
    </View>
  );
};
const Styles = StyleSheet.create({
  image: { height: 200, width: 300, marginBottom: 10, marginTop: 10 },
  text: { fontSize: 18, fontWeight: "bold" },
});
export default ResultsShow;
