import { StyleSheet,TextInput, Alert, Image, Text, View, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
//import { TextInput } from 'react-native-paper';
import styles from "./AddHabitPage.style";
import HomePage from '../HomePage';
import colors from '../../colors';
import { default as axios } from 'axios';

export default function AddHabitPage({ navigation }) {

  const [habitTitle, sethabitTitle] = React.useState("");
  const [habitDesc, sethabitDesc] = React.useState("");
  const [habitDay, sethabitDay] = React.useState(0);

  function handleSubmit() {
    const habitData = {
      habitTitle,
      habitDesc,
      habitDay,
    };
    axios.post("https://habitup-backend.onrender.com/habit", habitData).then(ToastAndroid.show('Alışkanlık eklendi!', ToastAndroid.SHORT)).catch(e => console.log(e));
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomePage' }],
      })
    ); // Ana sayfaya yönlendirme
  }

  return (
    <View style={styles.body}>
      <View style={{ backgroundColor: colors.black2, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 24, width: Dimensions.get('window').width }}>
        <TouchableOpacity onPress=
          {() => navigation.goBack()}>
          <View style={{ height: 52, paddingHorizontal: 24, width: 52, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Image style={{ height: 20, width: 20, tintColor: colors.purple }}
              source={require('../../../assets/icons/arrow.png')} />
          </View>
        </TouchableOpacity>
        <Image style={{ height: 40, width: 108, marginTop: 8 }}
          source={require('../../../assets/images/logo.png')} />
        <TouchableOpacity onPress=
          {() => null}>
          <View style={{ height: 52, paddingHorizontal: 8, width: 52, justifyContent: 'center', alignItems: 'flex-end' }}>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Alışkanlık Ekle</Text>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 12, backgroundColor: colors.black2 }}></View>
      <TextInput
        style={styles.input}
        placeholder="Alışkanlık İsmi"
        placeholderTextColor={colors.gray}
        cursorColor={colors.black2}
        value={habitTitle}
        onChangeText={habitTitle => sethabitTitle(habitTitle)}
      />
      <TextInput
        style={styles.input}
        placeholder="Alışkanlık Açıklaması"
        placeholderTextColor={colors.gray}
        cursorColor={colors.black2}
        value={habitDesc}
        onChangeText={habitDesc => sethabitDesc(habitDesc)}
      />
      <TextInput
        style={styles.input}
        placeholder="Alışkanlık Süresi (Gün)"
        placeholderTextColor={colors.gray}
        cursorColor={colors.black2}
        value={habitDay}
        onChangeText={habitDay => sethabitDay(habitDay)}
        keyboardType='numeric'
      />
        <TouchableOpacity onPress={() => handleSubmit()}>
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>
              Ekle
            </Text>
          </View>
        </TouchableOpacity>
      </View>
  );
}

export default AddHabitPage;