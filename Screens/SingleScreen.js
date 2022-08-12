import { StyleSheet, View } from "react-native";

import React, { useEffect, useState } from "react";
import { Text } from "react-native-elements";

import axios from "axios";

export const SingleScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        alert(error.message);
      });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.individual}>
        <Text style={styles.userId}>{data?.userId}</Text>
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.body}>{data?.body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#fff',
    paddingTop: 100,
  },
  individual: {
    width: 300,
    backgroundColor: "#001219",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  userId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F1FAEE",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
    marginBottom: 12,
    color: "#E63946",
  },
  body: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "capitalize",
    textAlign: "justify",
    marginBottom: 12,
    color: "#F1FAEE",
  },
});
