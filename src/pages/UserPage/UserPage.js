import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal, ScrollView, ActivityIndicator, FlatList, ToastAndroid, Image, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import styles from "./UserPage.style";
import HomePage from '../HomePage';
import colors from '../../colors';
import { all, default as axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { request } from 'react-native-permissions';
import Notifications from '../../../Notifications';
import DatePicker from 'react-native-date-picker';
import { format } from "date-fns";
import { tr } from "date-fns/locale"; // Türkçe dil desteği

export default function UserPage({ navigation, progressData }) {


  const [userdata, setUserdata] = useState('');
  const [allData, setallData] = useState([]);
  const [doneData, setdoneData] = useState([]);
  const [data, setdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDate, setModalVisibleDate] = useState(false);

  useEffect(() => {
    const fetchDataAll = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        await axios.post('https://habitup-backend.onrender.com/userdata', { token: token }).then(res => setUserdata(res.data.data));
      } catch (error) {
        if (error.response) {
          console.error('Response Error:', error.response.data);
          console.error('Status Code:', error.response.status);
        } else {
          console.error('Error:', error.message);
        }
      }
    };
    const requestPermission = async () => {
      const checkPermission = await checkNotificationPermission();
      if (checkPermission !== RESULTS.GRANTED) {
        const request = await requestNotificationPermission();
        if (request !== RESULTS.GRANTED) {
        }
      }
    };
    requestPermission();
    fetchDataAll();
  }, []);

  const requestNotificationPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result;
  };

  const checkNotificationPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result;
  };



  const handleLogout = async () => {
    setModalVisible(true)
  };

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

  const [date, setDate] = useState(new Date())

  const showToast = (title) => {
    ToastAndroid.show("Hatırlatıcı kaydedildi: " + title, ToastAndroid.SHORT);
  };

  const handleRemoveNot = (data) => {
    Notifications.cancelNotification(data);
    setModalVisibleDate(!modalVisibleDate);
    ToastAndroid.show("Hatırlatıcı iptal edildi", ToastAndroid.SHORT);

}

  const openDatepicker = () => {
    setModalVisibleDate(true);
  }
  const closeDatePicker = () => {
    setModalVisibleDate(false);
  }

  const setNotification = (title, message) => {
    setModalVisibleDate(!modalVisibleDate);
    Notifications.schduleNotification(date, title, message);
    const dateHM = date;
    const formattedDate = format(dateHM, 'hh:mm', { locale: tr });
    showToast(formattedDate);
  };

  return (
    <View style={styles.body}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Çıkış yapılsın mı?</Text>
            <Text style={styles.modalText}>Çıkış yaptıktan sonra uygulamayı kullanabilmeniz için tekrar giriş yapmanız gerekmeketedir.</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={[styles.addButtonHalf, { marginRight: 16, backgroundColor: colors.black2, borderWidth: 0.6, borderColor: colors.gray }]}>
                  <Text style={styles.addButtonText}>
                    Vazgeç
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => functionLogout()}>
                <View style={styles.addButtonHalf}>
                  <Text style={styles.addButtonText}>
                    Çıkış Yap
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleDate}
        onRequestClose={() => {
          setModalVisibleDate(!modalVisibleDate);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewDate}>
            <View style={{ alignItems: 'flex-end', height: 28 }}>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={closeDatePicker}>
                <Image style={styles.closeButton} source={require("../../../assets/icons/cross.png")} />
              </TouchableOpacity>
            </View>
            <View style={styles.dateContainer}>
              <DatePicker androidVariant='iosClone' style={styles.datePicker} is24hourSource='device' fadeToColor='#D9D9D9' textColor='red' mode='time' date={date} onDateChange={setDate} />
            </View>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:18}}>
              <TouchableOpacity
                style={[styles.buttonOpen, {backgroundColor: colors.black2, borderWidth: 0.6, borderColor: colors.gray}]}
                onPress={() => handleRemoveNot(data)}>
                <Text style={styles.textStyle}>İptal Et</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonOpen}
                onPress={() => setNotification("İlaç Hatırlatıcısı", data)}>
                <Text style={styles.textStyle}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ backgroundColor: colors.black2, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 24, width: Dimensions.get('window').width }}>
        <TouchableOpacity onPress=
          {() => navigation.goBack()}>
          <View style={{ height: 52, paddingHorizontal: 1, width: 52, justifyContent: 'center', alignItems: 'flex-right' }}>
            <Image style={{ height: 30, width: 30, tintColor: colors.purple }}
              source={require('../../../assets/icons/arrow.png')} />
          </View>
        </TouchableOpacity>
        <Image style={{ height: 40, width: 96, marginTop: 8 }}
          source={require('../../../assets/images/logo.png')} />
        <TouchableOpacity onPress={() => null}>
          <View style={{ height: 52, paddingHorizontal: 6, width: 52, justifyContent: 'center', alignItems: 'flex-end' }}>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 16, marginTop: 0, marginBottom: 10, alignSelf: 'flex-start' }}>
        <View style={{ backgroundColor: colors.purple, height: 26, width: 26, alignSelf: 'center', justifyContent: 'center', borderRadius: 50, alignItems: 'center', marginRight: 12, }}>
          <Image style={{ height: 20, width: 20, tintColor: colors.black1 }}
            source={require('../../../assets/icons/user.png')} />
        </View>
        <Text style={[styles.title, { color: colors.purple }]}>{userdata.username}</Text>
      </View>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 10, marginBottom: 10, backgroundColor: colors.black2 }}></View>
      <TouchableOpacity onPress={openDatepicker}>
        <View style={styles.NavCont}>
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.title, { fontFamily: "Manrope-SemiBold" }]} >Bildirim Ayarları</Text>
            <Text style={[styles.desc]} >Günlük bildirim saatini buradan düzenleyebilir ve dilediğin zaman bildirimi iptal edebilirsin.</Text>
          </View>
          <Image style={{ height: 20, width: 20, tintColor: colors.white, }}
            source={require('../../../assets/icons/bell.png')} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyHabitsPage')}>
        <View style={styles.NavCont}>
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.title, { fontFamily: "Manrope-SemiBold" }]} >Alışkanlıklarım</Text>
            <Text style={styles.desc} >Alışkanlıklarını buradan takip edebilir ve düzenleyebilirsin</Text>
          </View>
          <Image style={{ height: 20, width: 20, tintColor: colors.white, }}
            source={require('../../../assets/icons/myhabits.png')} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyStats')}>
        <View style={styles.NavCont}>
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.title, { fontFamily: "Manrope-SemiBold" }]} >İstatistiklerim</Text>
            <Text style={styles.desc} >Alışkanlıklarınla ilgili istatistikleri buradan inceleyebilirsin</Text>
          </View>
          <Image style={{ height: 20, width: 20, tintColor: colors.white, }}
            source={require('../../../assets/icons/graph.png')} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLogout()}>
        <View style={styles.NavCont}>
          <Text style={[styles.title, { fontFamily: "Manrope-SemiBold", marginBottom: 2 }]} >Çıkış Yap</Text>
          <Image style={{ height: 20, width: 20, tintColor: colors.white, marginRight: -2 }}
            source={require('../../../assets/icons/logout.png')} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default UserPage;