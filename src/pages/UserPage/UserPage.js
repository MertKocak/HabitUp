import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import styles from "./UserPage.style";
import HomePage from '../HomePage';
import colors from '../../colors';
import { default as axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserPage({ navigation, route }) {

  const [userdata, setUserdata] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      await axios.post('https://habitup-backend.onrender.com/userdata', { token: token }).then(res => setUserdata(res.data.data));
    };
    fetchData();
  }, []);
 

 
  const handleLogout = async () => {
    Alert.alert('Çıkış yapılsın mı?', 'Çıkış yaptıktan sonra uygulamayı kullanabilmeniz için tekrar giriş yapmanız gerekmeketedir.', [
          {
            text: 'Vazgeç',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Çıkış Yap', onPress: () => functionLogout()},
        ]);
    const functionLogout = async () => {
    await AsyncStorage.setItem('isLoggedIn', '');
    await AsyncStorage.setItem('token', '');
    await navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'LoginPage' }],
          })
        );
    }
  };


  return (
    <View style={styles.body}>
      <View style={{ backgroundColor: colors.black2, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 24, width: Dimensions.get('window').width }}>
        <TouchableOpacity onPress=
          {() => navigation.goBack()}>
          <View style={{ height: 52, paddingHorizontal: 10, width: 52, justifyContent: 'center', alignItems: 'flex-right' }}>
            <Image style={{ height: 20, width: 20, }}
              source={require('../../../assets/icons/arrow.png')} />
          </View>
        </TouchableOpacity>
        <Image style={{ height: 40, width: 108, marginTop: 8 }}
          source={require('../../../assets/images/logo.png')} />
        <TouchableOpacity onPress=
          {() => handleLogout()}>
          <View style={{ height: 52, paddingHorizontal: 8, width: 52, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Image style={{ height: 24, width: 24, tintColor: colors.purple }}
              source={require('../../../assets/icons/logout.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{userdata.username}</Text>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 10, marginBottom: -6, backgroundColor: colors.black2 }}></View>


      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

      </View>


    </View>
  );
}

export default UserPage;