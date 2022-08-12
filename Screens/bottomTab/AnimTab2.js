import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Colors from '../constants/Colors';

import Icon from '../components/IconCom';

import ColorScreen from '../ColorScreen';
import * as Animatable from 'react-native-animatable';
import {ListScreen} from '../ListScreen';
import {SearchScreen} from '../SearchList';
import {ProfileScreen} from '../ProfileScreen';
import {AddItemsScreen} from '../AddScreen';
import {Feather} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const TabArr = [
  {
    route: 'Import',
    label: 'Import',
    type: MaterialCommunityIcons,
    icon: 'home-import-outline',
    component: ListScreen,
  },
  {
    route: 'Export',
    label: 'Export',
    type: MaterialCommunityIcons,
    icon: 'home-export-outline',
    component: SearchScreen,
  },
  {
    route: 'Add',
    label: 'Add',
    type: Feather,
    icon: 'plus',
    component: AddItemsScreen,
  },
  {
    route: 'Account',
    label: 'Account',
    type: Feather,
    icon: 'user',
    component: ProfileScreen,
  },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: {scale: 0.5, translateY: 7},
  0.92: {translateY: -34},
  1: {scale: 1.2, translateY: -24},
  useNativeDriver: true,
};
const animate2 = {
  0: {scale: 1.2, translateY: -24},
  1: {scale: 1, translateY: 7},
  useNativeDriver: true,
};

const circle1 = {
  0: {scale: 0},
  0.3: {scale: 0.9},
  0.5: {scale: 0.2},
  0.8: {scale: 0.7},
  1: {scale: 1},
  useNativeDriver: true,
};
const circle2 = {0: {scale: 1}, 1: {scale: 0}, useNativeDriver: true};

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({scale: 1});
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({scale: 0});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Icon
            type={item.type}
            name={item.icon}
            color={focused ? '#000' : '#fff'}
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function AnimTab1() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
    backgroundColor: '#000',
    shadowColor: '#171717',
    shadowOffset: {width: -3, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#d9d9d9',
    backgroundColor: '#fca311',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fca311',
    borderRadius: 25,
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
    color: '#d9d9d9',
    fontWeight: '600',
  },
});
