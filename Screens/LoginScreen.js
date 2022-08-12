import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';

import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import React, {useCallback, useLayoutEffect} from 'react';
import {Button, Input, Image, Text} from 'react-native-elements';
const staticImage = require('./Images/logo-log.png');
import {useSelector, useDispatch} from 'react-redux';
import {signIn, authSelector, clearFormError} from './Redux/Slice/AuthSlice';
import {toastMessage} from './Helper';
import {loginSchema} from '../utils';

export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {isLoading, formError} = useSelector(authSelector);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: 'elavarasanmurugesandevi@gmail.com',
      password: 'sachin321',
    },
    resolver: yupResolver(loginSchema),
  });

  const clearServerError = useCallback(() => {
    dispatch(clearFormError());
  }, [dispatch]);

  const logIn = data => {
    if (data) {
      dispatch(
        signIn(data, () => {
          console.log('hai');
          toastMessage('Logged in successfully');
          navigation.push('Main');
        }),
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={{fontWeight: '700'}} h3>
          Login
        </Text>
        <Image source={staticImage} style={{height: 200, width: 250}} />
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                type="email"
                onBlur={onBlur}
                onChangeText={value => {
                  onChange(value);
                  clearServerError();
                }}
                placeholder="Email"
                autoCapitalize="none"
                errorMessage={errors?.email?.message || formError?.email}
                value={value}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                type="password"
                secureTextEntry
                autoCapitalize="none"
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={value => {
                  onChange(value);
                  clearServerError();
                }}
                errorMessage={errors?.password?.message || formError?.password}
                value={value}
              />
            )}
            name="password"
          />
        </View>
        <Button
          title="Login"
          loading={isLoading}
          containerStyle={styles.button}
          onPress={handleSubmit(logIn)}
        />
        <Button
          title="Register"
          type="outline"
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: 300,
    marginTop: 10,
  },
  button: {
    width: 200,
    marginTop: 15,
    borderRadius: 8,
  },
});
