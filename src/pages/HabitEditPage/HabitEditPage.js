import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
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
        console.log("Güncelleme başarılı:", res.data);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomePage' }],
          })
        ); // Ana sayfaya yönlendirme
      })
      .catch(e => console.error("Hataaaa:", e));
  }

  function handleDelete(id) {
    axios
      .delete(`https://habitup-backend.onrender.com/habit/${id}`)
      .then(res => {
        console.log("Silme işlemi başarılı:", res.data);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomePage' }],
          })
        ); // Ana sayfaya yönlendirme
      })
      .catch(e => console.error("Hataaaa:", e));
  }


  return (
    <View style={styles.body}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={[styles.title, { textAlign: 'center', flex: 1 }]}>
          Alışkanlık Düzenle
        </Text>
        <TouchableOpacity onPress={() => handleDelete(id)}>
          <View style={{height: 32, width: 32, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Image
              style={{ height: 22, width: 22, tintColor: colors.purple }}
              source={require('../../../assets/icons/trash.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
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

      <TouchableOpacity onPress={() => handleSubmit(id)}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>
            Kaydet
          </Text>
        </View>
      </TouchableOpacity>
      <Text>

      </Text>


    </View>
  );
}

export default HabitEditPage;