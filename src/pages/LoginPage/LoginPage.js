import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import styles from "./LoginPage.style";
import HomePage from '../HomePage';
import colors from '../../colors';
import { default as axios } from 'axios';

export default function AddHabitPage({ navigation }) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit() {
    const habitData = {
      email,
      password,
    };
    axios.post("https://habitup-backend.onrender.com/habit", habitData).then(res => console.log(res.data)).catch(e => console.log(e));
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomePage' }],
      })
    ); // Ana sayfaya yönlendirme
  }


  return (
    <View style={styles.body}>
      <Image style={{ height: 120, width: 240, marginTop: 20}}
        source={require('../../../assets/images/logo.png')} />
      <Text style={styles.title}>Giriş Yap!</Text>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 12, backgroundColor: colors.black2 }}></View>
      <TextInput
        style={styles.input}
        label="E-posta Adresi"
        textColor='#1B1B1B'
        activeOutlineColor='#1B1B1B'
        underlineColor='#1B1B1B'
        activeUnderlineColor='#B836FC'
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        label="Şifre"
        textColor='#1B1B1B'
        activeOutlineColor='#1B1B1B'
        underlineColor='#1B1B1B'
        activeUnderlineColor='#B836FC'
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <TouchableOpacity onPress={() => handleSubmit()}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>
            Giriş Yap!
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.text}>
          Henüz bir hesabınız yok mu?
        </Text>
        <TouchableOpacity onPress={() => {navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'RegisterPage' }],
                    })
                  ); }}>
          <Text style={styles.registerText}>
            Kayıt Olun!
          </Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}

export default AddHabitPage;