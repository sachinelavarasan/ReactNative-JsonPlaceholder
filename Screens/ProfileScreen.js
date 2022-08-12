import {StyleSheet, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef} from 'react';
import {Text, Image, Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

export const ProfileScreen = ({navigation}) => {
  const viewRef = useRef(null);

  const [data, setData] = useState([]);

  const signOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewRef.current.animate({
        0: {opacity: 0.8},
        1: {opacity: 1},
      });
    });
    return () => unsubscribe;
  }, [navigation]);

  useEffect(async () => {
    const username = await AsyncStorage.getItem('@name');
    const email = await AsyncStorage.getItem('@email');
    const password = await AsyncStorage.getItem('@password');
    const imageurl = await AsyncStorage.getItem('@imageurl');
    setData({
      username: username,
      imageurl: imageurl,
      email: email,
      password: password,
    });
  }, []);

  return (
    <Animatable.View
      ref={viewRef}
      easing={'ease-in-out'}
      style={styles.container}
    >
      <View style={styles.individual}>
        <Text style={styles.body}>
          <Image
            source={{uri: data?.imageurl}}
            containerStyle={styles.image}
            style={{height: 250, width: 250}}
          />
        </Text>
        <Text style={styles.userId}>{data?.username}</Text>
        <Text style={styles.title}>{data?.email}</Text>
        <Button
          title="Logout"
          buttonStyle={{
            backgroundColor: 'red',
            borderRadius: 3,
          }}
          titleStyle={{fontWeight: 'bold'}}
          onPress={signOut}
        />
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  individual: {
    width: 350,
    backgroundColor: '#001219',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#171717',
    shadowOffset: {width: -3, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  userId: {
    fontSize: 35,
    fontWeight: '600',
    color: '#F1FAEE',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#E63946',
  },
  image: {
    borderRadius: 50,
  },
  body: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
    textAlign: 'justify',
    marginBottom: 12,
    color: '#F1FAEE',
  },
});
