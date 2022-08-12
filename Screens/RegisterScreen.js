import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import React, {useLayoutEffect, useCallback} from 'react';
import {Button, Input, Text} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';

import Icon from './components/IconCom';
import {Ionicons} from '@expo/vector-icons';

import {signUp, authSelector, clearFormError} from './Redux/Slice/AuthSlice';

import {registerSchema} from '../utils';

export const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {isLoading, formError} = useSelector(authSelector);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      imageurl: '',
    },
    resolver: yupResolver(registerSchema),
  });

  const clearServerError = useCallback(() => {
    dispatch(clearFormError());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: -15,
            }}
          >
            <Icon
              type={Ionicons}
              name="chevron-back"
              style={{fontSize: 34, color: 'white'}}
            ></Icon>
            <Text style={{fontSize: 16, color: 'white'}}>Back To Login</Text>
          </View>
        </TouchableOpacity>
      ),
    });
    dispatch(clearFormError());
  }, [navigation]);

  const Register = data => {
    if (data) {
      dispatch(
        signUp(data, () => {
          toastMessage('OTP sended to your mail');
          navigation.replace('Otpcode');
        }),
      );
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={{fontWeight: '700'}} h3>
        Create an account
      </Text>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur}}) => (
            <Input
              type="text"
              autoFocus
              onBlur={onBlur}
              autoCapitalize="none"
              placeholder="Full Name"
              onChangeText={data => onChange(data)}
              errorMessage={errors?.name?.message}
            />
          )}
          name="name"
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur}}) => (
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
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur}}) => (
            <Input
              type="password"
              secureTextEntry
              placeholder="Password"
              onBlur={onBlur}
              autoCapitalize="none"
              onChangeText={value => onChange(value)}
              errorMessage={errors?.password?.message}
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur}}) => (
            <Input
              type="text"
              placeholder="profile picture URL (optional)"
              onBlur={onBlur}
              autoCapitalize="none"
              onChangeText={value => onChange(value)}
            />
          )}
          name="imageurl"
        />
      </View>
      <Button
        title="Register"
        containerStyle={styles.button}
        raised
        loading={isLoading}
        onPress={handleSubmit(Register)}
      />
      <Button
        title="Already have a code?"
        type="outline"
        style={styles.button}
        onPress={() => navigation.navigate('Otpcode')}
      />
      <View style={{height: 60}} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: 300,
    marginTop: 15,
  },
  button: {
    width: 200,
    marginTop: 15,
    borderRadius: 8,
  },
});
