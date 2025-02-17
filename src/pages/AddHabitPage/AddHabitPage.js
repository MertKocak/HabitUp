import { StyleSheet, TextInput, Alert, Image, Text, View, Dimensions, Modal, TouchableOpacity, ToastAndroid } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
//import { TextInput } from 'react-native-paper';
import styles from "./AddHabitPage.style";
import HomePage from '../HomePage';
import colors from '../../colors';
import { default as axios } from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddHabitPage({ navigation }) {

  const [habitTitle, sethabitTitle] = React.useState("");
  const [habitDesc, sethabitDesc] = React.useState("");
  const [habitDay, sethabitDay] = React.useState(0);
  const [habitIsDone, sethabitIsDone] = React.useState(false);
  const [userdata, setUserdata] = useState('');

  const [modalVisibleDay, setModalVisibleDay] = useState(false);
  const [modalVisibleEmpty, setModalVisibleEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      await axios.post('https://habitup-backend.onrender.com/userdata', { token: token }).then(res => setUserdata(res.data.data)).catch(error => {
        if (error.response) {
          alert('Sunucu hatası: ' + error.response.data ? error.response.data : "Sunucuya bağlanılamıyor.");
        } else {
          alert('Ağ bağlantı hatası: ' + error.message ? error.message : "Lütfen ağ bağlantınızı kontrol ediniz.");
        }
      });
    };
    fetchData();
    console.log("KULLANICI ADI: " + userdata._id);
  }, [userdata._id]);



  const handleSubmit = async () => {
    if (habitDay > 1095 || habitDay <= 0) {
      setModalVisibleDay(true)
    }
    else if (!habitDay || !habitTitle) {
      setModalVisibleEmpty(true)
    } else {
      const userId = userdata._id;
      const habitData = {
        habitTitle,
        habitDesc,
        habitDay,
        habitIsDone,
        userId,
      };
      axios.post("https://habitup-backend.onrender.com/habit", habitData).then(ToastAndroid.show('Alışkanlık eklendi!', ToastAndroid.SHORT)).catch(e => console.log(e));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomePage' }],
        })
      ); // Ana sayfaya yönlendirme
    }

  }

  return (
    <View style={styles.body}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleDay}
        onRequestClose={() => setModalVisibleDay(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Alışkanlık Kaydedilemedi!</Text>
            <Text style={styles.modalText}>Alışkanlık süresi en az 1 ve en fazla 1095 gün (3 yıl) olarak belirlenebilir.</Text>
            <TouchableOpacity onPress={() => setModalVisibleDay(false)}>
              <View style={styles.addButtonFull}>
                <Text style={styles.addButtonText}>
                  Tekrar Dene
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleEmpty}
        onRequestClose={() => setModalVisibleEmpty(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Alışkanlık Kaydedilemedi!</Text>
            <Text style={styles.modalText}>Alışkanlık ismi ve süresi boş bırakılamaz.</Text>
            <TouchableOpacity onPress={() => setModalVisibleEmpty(false)}>
              <View style={styles.addButtonFull}>
                <Text style={styles.addButtonText}>
                  Tekrar Dene
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{ backgroundColor: colors.black2, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 24, width: Dimensions.get('window').width }}>
        <TouchableOpacity onPress=
          {() => navigation.goBack()}>
          <View style={{ height: 52, paddingHorizontal: 22, width: 52, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Image style={{ height: 30, width: 30, tintColor: colors.purple }}
              source={require('../../../assets/icons/arrow.png')} />
          </View>
        </TouchableOpacity>
        <Image style={{ height: 40, width: 96, marginTop: 8 }}
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
        placeholder="Alışkanlık Açıklaması (İsteğe Bağlı)"
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
          <Text style={styles.AddButtonText}>
            Ekle
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default AddHabitPage;