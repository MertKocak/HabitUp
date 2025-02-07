import { StyleSheet, Text, Button, TextInput, View, Dimensions, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
//import { TextInput } from 'react-native-paper';
import styles from "./LoginPage.style";
import HomePage from '../HomePage';
import UserPage from '../UserPage';
import colors from '../../colors';
import { default as axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';


export default function LoginPage({ navigation }) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secureText, setSecureText] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (email, password) => {
    if (!validateEmail(email)) {
          Alert.alert('Geçersiz E-posta!', 'Lütfen geçerli bir e-posta adresi giriniz.');
          return;
        }
        if (password.length < 6) {
          Alert.alert('Geçersiz Şifre!', 'Şifreniz en az 6 karakter olmalıdır.');
          return;
        }
    try {
      const response = await axios.post('https://habitup-backend.onrender.com/login', {
        email,
        password,
      });

      console.log(response.data); // Gelen yanıtı kontrol etmek için ekledik.

      if (response.data.status === "ok") {
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        await AsyncStorage.setItem('token', response.data.data);
        ToastAndroid.show('Giriş başarılı!', ToastAndroid.SHORT);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomePage' }],
          })
        );
      } else if (response.data.status === "userNotFound") {
        Alert.alert('Giriş Yapılamadı!', 'E-posta adresi ve/veya şifre yanlış.');
      }
    } catch (error) {
      console.error(error); // Hata çıktısını görmek için logla
      Alert.alert('Giriş Yapılamadı!', 'E-posta adresi ve/veya şifre yanlış.');
    }
  };

  return (
    <View style={styles.body}>
      <Image style={{ height: 120, width: 200, marginTop: 20 }}
        source={require('../../../assets/images/logo.png')} />
      <Text style={styles.title}>Giriş Yap!</Text>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 12, backgroundColor: colors.black2 }}></View>
      <TextInput
        style={styles.input}
        placeholder="E-posta Adresi"
        placeholderTextColor={colors.gray}
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.white, height: 48, marginTop: 16, width: Dimensions.get('window').width - 32, borderRadius: 6 }}>
        <TextInput
          style={[styles.input, { marginTop: 0, marginLeft: 0, marginRight: 0, width: Dimensions.get('window').width - 80, }]}
          placeholder="Şifre"
          placeholderTextColor={colors.gray}
          secureTextEntry={secureText}
          value={password}
          onChangeText={password => setPassword(password)}
        />
        <TouchableOpacity
          style={{ width: 48, height: 40, justifyContent: 'center', backgroundColor: colors.white, alignItems: 'center' }} onPress={() => setSecureText(!secureText)}>
          <Image style={{ height: 22, width: 22, tintColor: colors.gray }}
            source={secureText ? require('../../../assets/icons/hide.png') : require('../../../assets/icons/show.png')} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleLogin(email, password)}>
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
        <TouchableOpacity onPress={() => {
          navigation.navigate('RegisterPage');
        }}>
          <Text style={styles.registerText}>
            Kayıt Olun!
          </Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}

export default LoginPage;