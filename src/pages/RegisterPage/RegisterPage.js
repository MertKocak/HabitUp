import { StyleSheet,TextInput, Text, Button, View, Dimensions, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
//import { TextInput } from 'react-native-paper';
import styles from "./RegisterPage.style";
import HomePage from '../HomePage';
import colors from '../../colors';
import { default as axios } from 'axios';

export default function RegisterPage({ navigation }) {

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secureText, setSecureText] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (username, email, password) => {
    if (!validateEmail(email)) {
      Alert.alert('Geçersiz E-posta!', 'Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Geçersiz Şifre!', 'Şifreniz en az 6 karakter olmalıdır.');
      return;
    }
    if (!username || !email || !password) {
      Alert.alert('Eksik Bilgi!', 'Lütfen tüm alanları doldurduğunuzdan emin olun.');
      return;
    }
    var email = email.toLowerCase();
    const userData = {
      username,
      email,
      password,
    };
    try {
      const response = await axios.post("https://habitup-backend.onrender.com/register", userData);
      ToastAndroid.show('Kayıt başarılı!', ToastAndroid.SHORT);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginPage' }],
        })
      );
    } catch (error) {
      if (error.response) {
        // Sunucudan dönen hata mesajını doğrudan göster
        const errorMessage = error.response.data.message || 'Kayıt sırasında bir hata oluştu.';
        Alert.alert('Kayıt Başarısız!', errorMessage);
      } else {
        Alert.alert('Kayıt Başarısız!', 'Sunucuya bağlanılamadı.');
      }
    }
  };

  return (
    <View style={styles.body}>
      <Image style={{ height: 120, width: 240, marginTop: 20 }}
        source={require('../../../assets/images/logo.png')} />
      <Text style={styles.title}>Kayıt Ol!</Text>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 12, backgroundColor: colors.black2 }}></View>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        placeholderTextColor={colors.gray}
        cursorColor={colors.gray}
        value={username}
        onChangeText={username => setUsername(username)}
      />
      <TextInput
        style={styles.input}
        placeholder="E-posta Adresi"
        placeholderTextColor={colors.gray}
        cursorColor={colors.gray}
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.white, height: 48, marginTop: 16, width: Dimensions.get('window').width - 32, borderRadius: 6 }}>
        <TextInput
          style={[styles.input, { marginTop: 0, marginLeft: 0, marginRight: 0, width: Dimensions.get('window').width - 80, }]}
          placeholder="Şifre"
          placeholderTextColor={colors.gray}
          cursorColor={colors.gray}
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
      <TouchableOpacity onPress={() => handleSubmit(username, email, password)}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>
            Kayıt Ol!
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.text}>
          Zaten bir hesabınız var mı?
        </Text>
        <TouchableOpacity onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'LoginPage' }],
            })
          );
        }}>
          <Text style={styles.registerText}>
            Giriş Yapın!
          </Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}

export default RegisterPage;