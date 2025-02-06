import { StyleSheet, Alert, Text, View, Dimensions, ToastAndroid, TouchableOpacity, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import styles from "./HabitEditPage.style";
import { TextInput } from 'react-native-paper';
import HomePage from '../HomePage';
import colors from '../../colors';
import { default as axios } from 'axios';

export default function HabitEditPage({ navigation, route }) {
  const { id, title, desc, day } = route.params;

  const [habitTitle, sethabitTitle] = React.useState(title);
  const [habitDesc, sethabitDesc] = React.useState(desc);
  const [habitDay, sethabitDay] = React.useState(day);

  function handleSubmit(id) {
    const habitData = {
      habitTitle,
      habitDesc,
      habitDay,
    };
    axios
      .put(`https://habitup-backend.onrender.com/habit/${id}`, habitData)
      .then(res => {
        ToastAndroid.show('Değişiklikler kaydedildi!', ToastAndroid.SHORT);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomePage' }],
          })
        ); // Ana sayfaya yönlendirme
      })
      .catch(e => console.error("Hata:", e));
  }

  function handleDelete(id) {
    Alert.alert('Alışkanlık silinsin mi?', 'Bu işlem geri alınamaz.', [
      {
        text: 'Vazgeç',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Sil', onPress: () => deletefunction() },
    ]);
    const deletefunction = () => {
      axios
        .delete(`https://habitup-backend.onrender.com/habit/${id}`)
        .then(res => {
          ToastAndroid.show('Alışkanlık silindi!', ToastAndroid.SHORT);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomePage' }],
            })
          ); // Ana sayfaya yönlendirme
        })
        .catch(e => console.error("Hata:", e));
    }
  }

  const cancelSubmit = () => {
    Alert.alert('Değişikliklerden vazgeçilsin mi?', 'Yaptığınız değişiklikler kaydedilmeyecek.', [
      {
        text: 'Düzenlemeye Devam Et',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Vazgeç', onPress: () => cancelfunction()},
    ]);
    const cancelfunction = () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomePage' }],
        })
      ); // Ana sayfaya yönlendirme
    };
  };

  return (
    <View style={styles.body}>
      <View style={{ backgroundColor: colors.black2, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 24, width: Dimensions.get('window').width }}>
        <TouchableOpacity onPress=
          {() => navigation.goBack()}>
          <View style={{ height: 52, paddingHorizontal: 10, width: 52, justifyContent: 'center', alignItems: 'flex-right' }}>
            <Image style={{ height: 22, width: 22, }}
              source={require('../../../assets/icons/arrow.png')} />
          </View>
        </TouchableOpacity>
        <Image style={{ height: 40, width: 108, marginTop: 8 }}
          source={require('../../../assets/images/logo.png')} />
        <TouchableOpacity onPress=
          {() => handleDelete(id)}>
          <View style={{ height: 52, paddingHorizontal: 8, width: 52, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Image style={{ height: 22, width: 22, tintColor: colors.purple }}
              source={require('../../../assets/icons/trash.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>
        Alışkanlık Düzenle
      </Text>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 10, backgroundColor: colors.black2 }}></View>
      <TextInput
        style={styles.input}
        label="Alışkanlık İsmi"
        textColor='#1B1B1B'
        activeOutlineColor='#1B1B1B'
        underlineColor='#1B1B1B'
        activeUnderlineColor='#B836FC'
        value={habitTitle}
        onChangeText={habitTitle => sethabitTitle(habitTitle)}
      />
      <TextInput
        style={styles.input}
        label="Alışkanlık Açıklaması"
        textColor='#1B1B1B'
        activeOutlineColor='#1B1B1B'
        underlineColor='#1B1B1B'
        activeUnderlineColor='#B836FC'
        value={habitDesc}
        onChangeText={habitDesc => sethabitDesc(habitDesc)}
      />
      <TextInput
        style={styles.input}
        label="Alışkanlık Süresi (Gün)"
        textColor='#1B1B1B'
        activeOutlineColor='#1B1B1B'
        underlineColor='#1B1B1B'
        activeUnderlineColor='#B836FC'
        value={habitDay.toString()}
        onChangeText={habitDay => sethabitDay(habitDay)}
        keyboardType='numeric'
      />

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => cancelSubmit()}>
          <View style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>
              Vazgeç
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSubmit(id)}>
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>
              Kaydet
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text>

      </Text>


    </View>
  );
}

export default HabitEditPage;