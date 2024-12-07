import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import styles from "./AddHabitPage.style";
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
    }
    axios.post("http://192.168.1.105:3000/habit", habitData).then(res => console.log(res.data)).catch(e => console.log(e));
  }


  return (
    <View style={styles.body}>
      <Text style={styles.title}>Alışkanlık Ekle</Text>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 12, backgroundColor: colors.black2 }}></View>
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