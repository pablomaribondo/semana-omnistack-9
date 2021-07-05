import React, { useState, useEffect } from "react";
import { StyleSheet, Image, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SpotList from "../components/SpotList";
import logo from "../assets/logo.png";

const List = () => {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    (async () => {
      const techsArray = await (await AsyncStorage.getItem("techs"))
        .split(",")
        .map(tech => tech.trim());

      setTechs(techsArray);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
  },
});

export default List;
