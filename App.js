// import { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Button } from 'react-native-elements';
// import { StyleSheet, Text } from 'react-native';
// import {
//   NavigationContainer,
//   useNavigationContainerRef,
// } from '@react-navigation/native';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {
//   LoginScreen,
//   RegisterScreen,
//   ListScreen,
//   SingleScreen,
//   EditScreen,
// } from './Screens';

// const Stack = createNativeStackNavigator();

// export default MsgMe = () => {
//   const navigationRef = useNavigationContainerRef();
//   const signOut = async () => {
//     await AsyncStorage.clear();
//     navigationRef.navigate('Login');
//   };

//   const globalScreenOptions = {
//     headerStyle: { backgroundColor: '#2C6BED' },
//     headerTitleStyle: { color: '#fff' },
//     headerTintColor: '#fff',
//   };
//   const navigationOptions = {
//     gestureEnabled: false,
//     headerBackVisible: false,
//     headerRight: () => (
//       <Button
//         title="Logout"
//         buttonStyle={{
//           backgroundColor: 'red',
//           borderRadius: 3,
//         }}
//         titleStyle={{ fontWeight: 'bold' }}
//         onPress={signOut}
//       />
//     ),
//   };

//   useEffect(async () => {
//     const data = await AsyncStorage.getItem('@email');
//     if (data) {
//       navigationRef.navigate('List');
//     }
//   }, []);

//   return (
//     <NavigationContainer initialScreenName="Login" ref={navigationRef}>
//       <Stack.Navigator screenOptions={globalScreenOptions}>
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen
//           name="List"
//           component={ListScreen}
//           options={navigationOptions}
//         />
//         <Stack.Screen name="Individual" component={SingleScreen} />
//         <Stack.Screen name="Edit" component={EditScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {useEffect} from 'react';
import {RootSiblingParent} from 'react-native-root-siblings';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, LogBox} from 'react-native';

import AnimTab2 from './Screens/bottomTab/AnimTab2';

import store from './Screens/Redux/store';
import Colors from './Screens/constants/Colors';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

import {LoginScreen, RegisterScreen, OtpCodeScreen} from './Screens';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = useNavigationContainerRef();

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };
  useEffect(async () => {
    const data = await AsyncStorage.getItem('@email');
    if (data) {
      navigationRef.navigate('Main');
    }
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <RootSiblingParent>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={Colors.white}
            />
            <NavigationContainer ref={navigationRef}>
              <RootStack />
            </NavigationContainer>
          </SafeAreaView>
        </RootSiblingParent>
      </PaperProvider>
    </Provider>
  );
};

const signOut = async () => {
  await AsyncStorage.clear();
  navigationRef.navigate('Login');
};

const options = {
  headerStyle: {backgroundColor: '#2C6BED'},
  headerTitleStyle: {color: '#fff'},
  headerTintColor: '#fff',
};

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        name="Main"
        component={AnimTab2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Otpcode"
        component={OtpCodeScreen}
        options={{headerTitle: 'Verification code'}}
      />

      {/* <Stack.Screen
        name="Main"
        component={AnimTab2}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default App;
