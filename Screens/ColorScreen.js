import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, Text, View, Easing} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Styles from './common/Styles';

import {ListScreen} from './ListScreen';
import {SearchList} from './SearchList';
import {ProfileScreen} from './ProfileScreen';
import {AddItemsScreen} from './AddScreen';

export default function ColorScreen({route, navigation}) {
  const viewRef = React.useRef(null);

  // const [bgColor, setBgColor] = useState();

  // useEffect(() => {
  //   switch (route.name) {
  //     case 'Home': {
  //       setBgColor(Colors.primary);

  //       break;
  //     }
  //     case 'Search': {
  //       setBgColor(Colors.green);

  //       break;
  //     }
  //     case 'Add': {
  //       setBgColor(Colors.red);
  //       break;
  //     }
  //     case 'Account': {
  //       setBgColor(Colors.purple);
  //       break;
  //     }

  //     default:
  //       setBgColor(Colors.white);
  //   }
  // }, [route.name]);

  const renderLockedState = useCallback(() => {
    if (route.name === 'Add') {
      return <AddItemsScreen />;
    }
    if (route.name === 'Import') {
      return <ListScreen />;
    }
    if (route.name === 'Export') {
      return <SearchList />;
    }
    if (route.name === 'Account') {
      return <ProfileScreen />;
    }

    return null;
  }, [route.name]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewRef.current.animate({
        0: {opacity: 0.8},
        1: {opacity: 1},
      });
    });
    return () => unsubscribe;
  }, [navigation]);
  return (
    <View style={Styles.container}>
      <Animatable.View
        ref={viewRef}
        // animation="flipInY"
        // duration={500}
        // delay={500}
        easing={'ease-in-out'}
        style={Styles.container}
      >
        {renderLockedState()}
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({});
