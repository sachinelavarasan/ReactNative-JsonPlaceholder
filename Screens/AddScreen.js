import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import React, {useState, useCallback, useEffect, useMemo, useRef} from 'react';
import {Button, Text, Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {ItemContainer} from './components/ItemContainer';
import {registerSchema} from '../utils';
import * as Animatable from 'react-native-animatable';

export const AddItemsScreen = ({navigation}) => {
  const viewRef = useRef(null);
  const [list, setList] = useState([]);
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

  const signUp = useCallback(
    data => {
      setList(state => [
        ...state,
        {
          ...data,
        },
      ]);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list],
  );

  const listData = useMemo(
    () => [
      ...list.map((item, index) => ({
        ...item,
        serial: index + 1,
      })),
    ],
    [list],
  );
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
    <Animatable.View
      ref={viewRef}
      easing={'ease-in-out'}
      style={styles.container}
    >
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.text} h3>
            Add Imports Or Exports
          </Text>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur}}) => (
                <Input
                  type="text"
                  onBlur={onBlur}
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
                  onChangeText={value => onChange(value)}
                  placeholder="Email"
                  autoCapitalize="none"
                  errorMessage={errors?.email?.message}
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
                  onChangeText={value => onChange(value)}
                />
              )}
              name="imageurl"
            />
          </View>
          <Button
            title="Add Item"
            containerStyle={styles.button}
            icon={{
              name: 'plus',
              type: 'font-awesome',
              size: 20,
              color: 'black',
            }}
            titleStyle={{
              fontSize: 20,
              fontWeight: '600',
              color: 'black',
            }}
            buttonStyle={{
              backgroundColor: 'rgba(111, 202, 186, 1)',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 5,
              padding: 10,
            }}
            raised
            onPress={handleSubmit(signUp)}
          />
          <View style={{height: 20}} />
        </KeyboardAvoidingView>
        <ScrollView bounces={false}>
          {listData.map(item => {
            return <ItemContainer item={item} />;
          })}
        </ScrollView>
      </SafeAreaView>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  text: {
    padding: 10,
  },
  inputContainer: {
    width: 400,
    marginTop: 20,
  },
  button: {
    width: 150,
    marginRight: 10,
    marginTop: 10,
    alignSelf: 'flex-end',
    borderColor: 'transparent',
    borderWidth: 0,
  },
});
