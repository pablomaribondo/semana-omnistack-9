import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socketio from "socket.io-client";

import SpotList from "../components/SpotList";
import logo from "../assets/logo.png";

const List = () => {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    (async () => {
      const userId = await AsyncStorage.getItem("user");
      const socket = socketio(process.env.BASE_URL, {
        query: { user_id: userId },
      });

      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    })();
  }, []);

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
