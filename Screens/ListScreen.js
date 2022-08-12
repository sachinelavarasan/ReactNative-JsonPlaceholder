import {StyleSheet, View, FlatList, Animated, Text} from 'react-native';

import Colors from './constants/Colors';
import images from './constants/images';

import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect, useState, useMemo, useRef} from 'react';
import {SearchBar, Image} from 'react-native-elements';
import {getAllPosts, exportsSelector} from './Redux/Slice/ExportSlice';

import * as Animatable from 'react-native-animatable';

const contacts = [
  {name: 'Marissa Castillo', number: 7766398169},
  {name: 'Kailey Vazquez', number: 3002136330},
  {name: 'Jennifer Coleman', number: 5469629753},
  {name: 'Denzel Curry', number: 9394378449},
  {name: 'Payton Garza', number: 7916140875},
  {name: 'Irene Hunter', number: 2932176249},
  {name: 'Desiree Webster', number: 6818656371},
  {name: 'Samantha Young', number: 6538288534},
  {name: 'Annie Ryan', number: 4718456627},
  {name: 'Miles Ferguson', number: 8966872888},
  {name: 'Anna Moss', number: 3504954657},
  {name: 'Cindy Casey', number: 8446175026},
  {name: 'Lauren Reese', number: 4652613201},
  {name: 'Jarrod Avila', number: 8339212305},
  {name: 'Griffin Weaver', number: 6059349721},
  {name: 'Wayne Day', number: 6918839582},
  {name: 'Dillon Doyle', number: 5614510703},
  {name: 'Savannah Garcia', number: 5634775094},
  {name: 'Emilee Moss', number: 7382905180},
  {name: 'Sasha Oliver', number: 9743195919},
  {name: 'Angelique Oliver', number: 9689298436},
  {name: 'Emanuel Little', number: 6673376805},
  {name: 'Kailey Ward', number: 2232609512},
  {name: 'Gabrielle Newman', number: 2837997127},
  {name: 'Luke Strickland', number: 8404732322},
];
export const dummyText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";

const bagsList = [
  {
    id: '101',
    title: 'Orange Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag1,
    price: 799,
    bgColor: Colors.bag1Bg,
  },
  {
    id: '102',
    title: 'Office code',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag2,
    price: 599,
    bgColor: Colors.bag2Bg,
  },
  {
    id: '103',
    title: 'Fristo Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag3,
    price: 299,
    bgColor: Colors.bag3Bg,
  },
  {
    id: '104',
    title: 'Envias Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag4,
    price: 199,
    bgColor: Colors.bag4Bg,
  },
  {
    id: '105',
    title: 'Fostelo Bag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag5,
    price: 599,
    bgColor: Colors.bag5Bg,
  },
  {
    id: '106',
    title: "Women's handbag",
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag6,
    price: 299,
    bgColor: Colors.bag6Bg,
  },
  {
    id: '107',
    title: 'Alia Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag7,
    price: 799,
    bgColor: Colors.bag7Bg,
  },
  {
    id: '108',
    title: 'Envias Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag8,
    price: 199,
    bgColor: Colors.bag8Bg,
  },
  {
    id: '109',
    title: 'Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag9,
    price: 499,
    bgColor: Colors.bag9Bg,
  },
  {
    id: '110',
    title: 'Bizanne Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag10,
    price: 699,
    bgColor: Colors.bag10Bg,
  },
  {
    id: '111',
    title: 'Blue Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag11,
    price: 99,
    bgColor: Colors.bag11Bg,
  },
  {
    id: '112',
    title: 'Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag9,
    price: 499,
    bgColor: Colors.bag9Bg,
  },
  {
    id: '113',
    title: 'Bizanne Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag10,
    price: 699,
    bgColor: Colors.bag10Bg,
  },
  {
    id: '114',
    title: 'Blue Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag11,
    price: 99,
    bgColor: Colors.bag11Bg,
  },
  {
    id: '115',
    title: 'Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag9,
    price: 499,
    bgColor: Colors.bag9Bg,
  },
  {
    id: '116',
    title: 'Bizanne Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag10,
    price: 699,
    bgColor: Colors.bag10Bg,
  },
  {
    id: '117',
    title: 'Blue Handbag',
    subtitle: 'Aristocratic Hand Bag',
    description: dummyText,
    image: images.bag11,
    price: 99,
    bgColor: Colors.bag11Bg,
  },
];

export const ListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const viewRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const {isListLoading, isPostsLoading, posts} = useSelector(exportsSelector);

  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewRef.current.animate({
        0: {opacity: 0.8},
        1: {opacity: 1},
      });
    });
    return () => unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   dispatch(getAllPosts());
  // }, [dispatch]);

  const data = useMemo(
    () => [
      ...(contacts || []).filter(item =>
        `${item?.name}`.toLowerCase().includes(search),
      ),
    ],
    [contacts, search],
  );
  const itemSize = 70 + 10 * 3;

  return (
    <Animatable.View
      style={styles.container}
      ref={viewRef}
      easing="ease-in-out"
    >
      <Image
        source={{
          uri: 'https://img.icons8.com/office/344/user.png',
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <SearchBar
        placeholder="Search Here..."
        onChangeText={setSearch}
        value={search}
        containerStyle={styles.search}
      />
      <Animated.FlatList
        data={bagsList}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{padding: 15}}
        renderItem={({item, index}) => {
          const inputRange = [-1, 0, itemSize * index, itemSize * (index + 2)];
          const opacityInputRange = [
            -1,
            0,
            itemSize * index,
            itemSize * (index + 0.5),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: 10,
                marginBottom: 8,
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                transform: [{scale}],
                opacity,
              }}
            >
              <Image
                source={item.image}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 60,
                  marginRight: 15,
                }}
              />

              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    opacity: 0.7,
                  }}
                >
                  {item.subtitle}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    opacity: 0.9,
                    color: '#fca311',
                  }}
                >
                  {item.price}
                </Text>
              </View>
            </Animated.View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 60,
    paddingBottom: 90,
  },
  search: {
    paddingTop: 8,
    width: '100%',
    height: 60,
    position: 'absolute',
    top: 0,
    zIndex: 2000,
  },

  listContainer: {
    marginTop: 3,
    color: '#ee9b00',
    fontWeight: '500',
    textAlign: 'justify',
  },
});
