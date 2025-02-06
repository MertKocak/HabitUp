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
    Alert.alert('Çıkış yapılsın mı?', 'Çıkış yaptıktan sonra uygulamayı kullanabilmek için tekrar giriş yapmanız gerekmeketedir.', [
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
      <Text style={styles.title}>Merhaba {userdata.username}</Text>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 12, backgroundColor: colors.black2 }}></View>

<TouchableOpacity onPress={() => handleLogout()}>
  <View>
    <Text>
      ÇIKIŞ YAP
    </Text>
  </View>
</TouchableOpacity>


      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

      </View>


    </View>
  );
}

export default UserPage;