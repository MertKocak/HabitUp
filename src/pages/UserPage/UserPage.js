import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal, ScrollView, ActivityIndicator, FlatList, ToastAndroid, Image, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import styles from "./UserPage.style";
import HomePage from '../HomePage';
import colors from '../../colors';
import { all, default as axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import { format } from "date-fns";
import { tr } from "date-fns/locale"; // Türkçe dil desteği
import PushNotification from "react-native-push-notification";
import { Platform,PermissionsAndroid } from 'react-native';

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
    requestNotificationPermission();
    fetchDataAll();
    createChannels();
    loadData();
  }, []);

  const requestNotificationPermission = async () => {
    if(Platform.OS ==="android"){
      try {
        PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
          response => {
            if(!response){
              PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS',{
                  title: 'Notification',
                  message:
                    'App needs access to your notification ' +
                    'so you can get Updates',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
              })
            }
          }
        ).catch(
          err => {
            console.log("Notification Error=====>",err);
          }
        )
      } catch (err){
        console.log(err);
      }
    }
  };


  const handleLogout = async () => {
    setModalVisible(true)
  };

  const functionLogout = async () => {
    await AsyncStorage.setItem('isLoggedIn', '');
    await AsyncStorage.setItem('token', '');
    PushNotification.cancelAllLocalNotifications();
    await navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      })
    );
  }

  const [date, setDate] = useState(new Date());
  const [notDate, setNotDate] = useState("Bildirim saati ayarlanmadı.");

  // Veriyi AsyncStorage'a kaydetme
  const saveData = async (newDate) => {
    try {
      // Yeni veriyi AsyncStorage'a kaydet
      await AsyncStorage.setItem('notificationDate', newDate);
      setNotDate(newDate); // State'i de güncelle
    } catch (e) {
      console.error('Veri kaydedilirken hata oluştu', e);
    }
  };

  // Veriyi AsyncStorage'dan okuma
  const loadData = async () => {
    try {
      const savedDate = await AsyncStorage.getItem('notificationDate');
      if (savedDate !== null) {
        setNotDate(savedDate); // State'i güncelle
      }
    } catch (e) {
      console.error('Veri yüklenirken hata oluştu', e);
    }
  };


  const handleRemoveNot = () => {
    PushNotification.cancelAllLocalNotifications()
    setModalVisibleDate(false);
    saveData("Bildirim saati ayarlanmadı.")
    ToastAndroid.show('Hatırlatıcı İptal Edildi', ToastAndroid.SHORT)

  }

  const handleNotification = () => {
    PushNotification.cancelAllLocalNotifications();
    PushNotification.localNotificationSchedule({
      channelId: "channel",
      title: "Hedefe Doğru! 🎯",
      message: "Küçük adımlar büyük başarılar getirir. İlerlemeni kaydetmeyi unutma!",
      date: date,
      allowWhileIdle: true,
      color: "#B836FC",
      repeatType: "day",
    });
    setModalVisibleDate(false);
    const formattedDate = format(date, 'HH:mm');
    ToastAndroid.show('Hatırlatıcı Kaydedildi!', ToastAndroid.SHORT);
    saveData("Bildirim Saati: " + formattedDate);
  };

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "channel",
        channelName: "Channel"
      }
    )
  }

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
                onPress={() => setModalVisibleDate(false)}>
                <Image style={styles.closeButton} source={require("../../../assets/icons/cross.png")} />
              </TouchableOpacity>
            </View>
            <View style={styles.dateContainer}>
              <DatePicker androidVariant='iosClone' style={styles.datePicker} is24hourSource='device' fadeToColor='#D9D9D9' textColor='red' mode='time' date={date} onDateChange={setDate} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 18 }}>
              <TouchableOpacity
                style={[styles.buttonOpen, { backgroundColor: colors.black2, borderWidth: 0.6, borderColor: colors.gray }]}
                onPress={() => handleRemoveNot()}>
                <Text style={styles.textStyle}>İptal Et</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonOpen}
                onPress={() => handleNotification()}>
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
      <View style={{ flexDirection: "row", marginLeft: 16, marginTop: -4, marginBottom: 10, alignSelf: 'flex-start', backgroundColor: colors.gray, borderRadius: 4, width: Dimensions.get("window").width - 32, padding: 16 }}>
        <View style={{ backgroundColor: colors.white, height: 28, width: 28, alignSelf: 'center', justifyContent: 'center', borderRadius: 50, alignItems: 'center', marginRight: 12, }}>
          <Image style={{ height: 22, width: 22, tintColor: colors.gray }}
            source={require('../../../assets/icons/user.png')} />
        </View>
        <View style = {{flexDirection: 'column'}}>
          <Text style={[styles.title, { color: colors.white }]}>{userdata.username}</Text>
          <Text style={[styles.title, { color: colors.white, marginTop: -2 }]}>{userdata.email}</Text>
        </View>
      </View>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 10, marginBottom: 10, backgroundColor: colors.black2 }}></View>
      <TouchableOpacity onPress={() => setModalVisibleDate(true)}>
        <View style={[styles.NavCont, { flexDirection: 'column' }]}>
          <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 64, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={[styles.title, { fontFamily: "Manrope-SemiBold" }]} >Bildirim Ayarları</Text>
              <Text style={[styles.desc]} >Günlük bildirim saatini ayarla veya iptal et.</Text>
            </View>
            <Image style={{ height: 20, width: 20, tintColor: colors.white, }}
              source={require('../../../assets/icons/bell.png')} />
          </View>
          <View style={{
            backgroundColor: colors.gray,
            padding: 8,
            marginTop: 8,
            marginLeft: -2,
            borderRadius: 4,
            width: Dimensions.get('window').width - 62
          }}>
            <Text style={[styles.desc, { marginTop: -2, fontFamily: "Manrope-Medium" }]}>{notDate}</Text>
          </View>
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