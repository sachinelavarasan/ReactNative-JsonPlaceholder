import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';

import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import React, {useCallback, useLayoutEffect} from 'react';
import {Button, Text, Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import Icon from './components/IconCom';
import {Ionicons} from '@expo/vector-icons';

import {useSelector, useDispatch} from 'react-redux';
import {
  verifyCode,
  authSelector,
  clearFormError,
} from './Redux/Slice/AuthSlice';

import {otpcodeSchema} from '../utils';

export const OtpCodeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {isLoading, formError} = useSelector(authSelector);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      otpcode: null,
      email: '',
    },
    resolver: yupResolver(otpcodeSchema),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.replace('Register')}>
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
            <Text style={{fontSize: 16, color: 'white'}}>Register</Text>
          </View>
        </TouchableOpacity>
      ),
    });
    dispatch(clearFormError());
  }, [navigation]);

  const clearServerError = useCallback(() => {
    dispatch(clearFormError());
  }, [dispatch]);

  const onSubmit = data => {
    if (data) {
      dispatch(
        verifyCode(data, () => {
          alert('Verified successfully');
          navigation.navigate('Login');
        }),
      );
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={{color: '#fff', marginTop: 40, fontWeight: '700'}} h3>
        Verification Code
      </Text>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              type="text"
              placeholder="Registered email"
              placeholderTextColor="#bfc0c0"
              autoCapitalize="none"
              inputContainerStyle={{
                borderBottomColor: '#fff',
                borderBottomWidth: 3,
              }}
              inputStyle={{
                fontSize: 20,
                fontWeight: '500',
                color: '#fff',
              }}
              onBlur={onBlur}
              onChangeText={value => {
                onChange(value);
                clearServerError();
              }}
              errorStyle={{
                fontWeight: '600',
                fontSize: 14,
              }}
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
              type="numeric"
              keyboardType="numeric"
              autoCapitalize="none"
              placeholder="Verification code"
              placeholderTextColor="#bfc0c0"
              inputContainerStyle={{
                borderBottomColor: '#fff',
                borderBottomWidth: 3,
              }}
              inputStyle={{
                fontSize: 20,
                fontWeight: '500',
                color: '#fff',
              }}
              onBlur={onBlur}
              errorStyle={{
                fontWeight: '600',
                fontSize: 14,
              }}
              onChangeText={value => {
                onChange(value);
                clearServerError();
              }}
              errorMessage={errors?.otpcode?.message || formError?.otpcode}
              value={value}
            />
          )}
          name="otpcode"
        />
      </View>
      <Button
        title="Verify Code"
        loading={isLoading}
        buttonStyle={{
          backgroundColor: 'black',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{fontWeight: 'bold', fontSize: 20}}
        onPress={handleSubmit(onSubmit)}
      />

      <View style={{height: 60}} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  inputContainer: {
    width: 300,
    marginTop: 30,
  },
});
