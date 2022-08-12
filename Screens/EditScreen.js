import { StyleSheet, View, KeyboardAvoidingView } from "react-native";

import React, { useEffect, useState } from "react";
import { Text, Input, Button } from "react-native-elements";

import axios from "axios";

export const EditScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`)
      .then(function (response) {
        setTitle(response.data.title);
        setBody(response.data.body);
        setUserId(response.data.userId);
      })
      .catch(function (error) {
        alert(error.message);
      });
  }, [navigation]);

  const Edit = async () => {
    const data = {
      title: title,
      body: body,
      userId: userId,
    };
    const res = await axios.patch(
      `https://jsonplaceholder.typicode.com/posts/${route.params.id}`,
      data
    );

    if (res) {
      setData(res.data);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.text} h3>
        User Id : {userId}
      </Text>

      <View style={styles.inputContainer}>
        <Input
          type="text"
          autoFocus
          placeholder="Title"
          value={title}
          onChangeText={(data) => setTitle(data)}
        />
        <Input
          type="text"
          placeholder="Body"
          value={body}
          onChangeText={(data) => setBody(data)}
        />
      </View>
      <Button
        title="Edit"
        raised
        containerStyle={styles.button}
        onPress={Edit}
      />
      <View style={{ height: 20 }} />
      {data ? (
        <View>
          <Text>{data.title}</Text>
          <Text>{data.body}</Text>
        </View>
      ) : null}
      <View style={{ height: 60 }} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: 300,
    marginTop: 10,
  },
  button: {
    width: 200,
    marginTop: 5,
    borderRadius: 8,
  },
});
