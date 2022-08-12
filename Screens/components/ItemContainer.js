import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Text} from 'react-native-elements';

export const ItemContainer = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} h4>
        Added Items
      </Text>
      <Text>{item.email}</Text>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    padding: 10,
  },
  text: {
    padding: 10,
  },
});
