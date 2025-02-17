import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal, ScrollView, ActivityIndicator, FlatList, ToastAndroid, Image, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import styles from "./MyStats.style";
import HomePage from '../HomePage';
import colors from '../../colors';
import { all, default as axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mt } from 'date-fns/locale';

export default function MyStats({ navigation, progressData }) {
  const [userdata, setUserdata] = useState('');
  const [allData, setallData] = useState([]);
  const [doneData, setdoneData] = useState([]);
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchDataDone = async () => {
      const token = await AsyncStorage.getItem("token");
      await axios.post('https://habitup-backend.onrender.com/userdata', { token: token }).then(res => setUserdata(res.data.data));
      try {
        const responseDone = await axios.get(`https://habitup-backend.onrender.com/habitDone/${userdata._id}`, {
          params: { userId: userdata._id, habitIsDone: true }
        });
        const reversedDataDone = await responseDone.data.reverse();
        await setdoneData(reversedDataDone);
      } catch (error) {
        if (error.response) {
          console.error('Response Error:', error.response.data);
          console.error('Status Code:', error.response.status);
        } else {
          console.error('Error:', error.message);
        }
      }
    };
    const fetchAllDataLength = async () => {
      const token = await AsyncStorage.getItem("token");
      await axios.post('https://habitup-backend.onrender.com/userdata', { token: token }).then(res => setUserdata(res.data.data));
      try {
        const response = await axios.get(`https://habitup-backend.onrender.com/habitAll/${userdata._id}`);
        const reservedData = await response.data.reverse();
        await setdata(reservedData);
      } catch (error) {
        if (error.response) {
          console.error('Response Error:', error.response.data);
          console.error('Status Code:', error.response.status);
        } else {
          console.error('Error:', error.message);
        }
      }
    };
    fetchAllDataLength();
    fetchDataDone();
  }, [userdata._id, allData, doneData]);

  const items = [];

  for (let i = 1; i <= 10; i++) {
    items.push(
      <View key={i} style={{
        backgroundColor: (doneData.length * 10) / data.length >= i ? colors.purple : colors.white,
        width: 24, aspectRatio: 1, flex: 1, marginTop: 0, marginRight: 2, marginLeft: 2, borderRadius: 4
      }}>
        {Math.floor((doneData.length * 10) / data.length) === i ? <Text style={{ color: colors.white, fontSize: i === 10 ? 10 : 12, fontFamily: "Manrope-Bold", justifyContent: 'center', textAlign: 'center', flex: 1, textAlignVertical: 'center', marginBottom: 4 }}>%{Math.floor(((doneData.length * 10) / data.length) * 10)}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.body}>
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
        <TouchableOpacity onPress=
          {() => navigation.navigate("HomePage")}>
          <View style={{ height: 52, paddingHorizontal: 8, width: 52, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Image style={{ height: 18, width: 18, tintColor: colors.purple }}
              source={require('../../../assets/icons/home.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={[styles.title, { color: colors.purple, alignSelf: 'center', }]}>İstatistikler</Text>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 12, backgroundColor: colors.black2, marginBottom: 16 }}></View>

      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <View style={{ backgroundColor: colors.black2, padding: 8, paddingLeft: 16, paddingRight: 16, flexDirection: "column", borderRadius: 6, width: (Dimensions.get("window").width - 48) / 2, borderWidth: 0.6, borderColor: colors.gray }}>
          <Text style={[styles.title, { fontSize: 14, color: colors.white, fontFamily: "Manrope-Medium", alignSelf: 'center', textAlign: 'center' }]}>Oluşturulan Toplam Alışkanlık Sayısı</Text>
          <View style={{ height: 0.8, width: (Dimensions.get('window').width - 112) / 2, marginTop: 10, marginBottom: 8, backgroundColor: colors.gray }}></View>
          <Text style={[styles.title, { fontSize: 14, color: colors.white, fontFamily: "Manrope-Bold", alignSelf: 'center', marginTop: -2 }]}>{data.length}</Text>
        </View>

        <View style={{ backgroundColor: colors.black2, padding: 8, paddingLeft: 16, paddingRight: 16, flexDirection: "column", borderRadius: 6, width: (Dimensions.get("window").width - 48) / 2, marginLeft: 16, borderWidth: 0.6, borderColor: colors.gray }}>
          <Text style={[styles.title, { fontSize: 14, color: colors.white, fontFamily: "Manrope-Medium", alignSelf: 'center', textAlign: 'center' }]}>Tamamlanan Toplam Alışkanlık Sayısı</Text>
          <View style={{ height: 0.8, width: (Dimensions.get('window').width - 112) / 2, marginTop: 10, marginBottom: 8, backgroundColor: colors.gray }}></View>
          <Text style={[styles.title, { fontSize: 14, color: colors.white, fontFamily: "Manrope-Bold", alignSelf: 'center', marginTop: -2 }]}>{doneData.length}</Text>
        </View>
      </View>


      <Text style={[styles.title, { fontSize: 14, marginLeft: 16, color: colors.white, marginTop: 8, marginBottom: 8, fontFamily: "Manrope-Medium", alignSelf: 'flex-start' }]}>Alışkanlık Tamamlama Oranı:</Text>
      <View style={{ flexDirection: "row", marginLeft: 14, marginRight: 14 }}>{items}</View>
    </View>
  );
}

export default MyStats;