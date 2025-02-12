import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, ToastAndroid, Image, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import styles from "./UserPage.style";
import HomePage from '../HomePage';
import colors from '../../colors';
import { all, default as axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserPage({ navigation, progressData }) {


  const [userdata, setUserdata] = useState('');
  const [allData, setallData] = useState([]);
  const [doneData, setdoneData] = useState([]);
  const [data, setdata] = useState([]);


  useEffect(() => {
    const fetchDataAll = async () => {
      const token = await AsyncStorage.getItem("token");
      await axios.post('https://habitup-backend.onrender.com/userdata', { token: token }).then(res => setUserdata(res.data.data));
      try {
        const responseAll = await axios.get(`https://habitup-backend.onrender.com/habitDone/${userdata._id}`, {
          params: { userId: userdata._id, habitIsDone: false }
        });
        const reversedDataAll = await responseAll.data.reverse();
        await setallData(reversedDataAll);
      } catch (error) {
        if (error.response) {
          console.error('Response Error:', error.response.data);
          console.error('Status Code:', error.response.status);
        } else {
          console.error('Error:', error.message);
        }
      }
    };
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
    fetchDataAll();
    fetchDataDone();
  }, [userdata._id, allData, doneData]);

  const handleLogout = async () => {
    Alert.alert('Çıkış yapılsın mı?', 'Çıkış yaptıktan sonra uygulamayı kullanabilmeniz için tekrar giriş yapmanız gerekmeketedir.', [
      {
        text: 'Vazgeç',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Çıkış Yap', onPress: () => functionLogout() },
    ]);
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
  };

  const renderAllItem = ({ item }) => {
    const dayCount = item.habitDay;
    return (

      <View
        style={[styles.container, { marginLeft: 8, width: Dimensions.get('window').width - 36, alignSelf: "flex-start", zIndex: 1, borderWidth: 1, backgroundColor: colors.black1 }]}
        key={item._id}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{
            height: 40, width: 28, marginRight: 8, marginLeft: -34, zIndex: 2,
            backgroundColor: colors.black1, justifyContent: 'center', alignSelf: 'center'
          }}>
            <Image style={{ height: 28, width: 28, tintColor: colors.gray }}
              source={require('../../../assets/icons/timer.png')} />
          </View>
          {item.habitDesc ?
            <View style={styles.innerCont}>
              <Text style={[styles.title, { marginTop: -2, color: colors.white }]}>{item.habitTitle}</Text>
              <Text style={styles.desc}>{item.habitDesc}</Text>
            </View> :
            <View style={styles.innerCont}>
              <Text style={styles.title}>{item.habitTitle}</Text>
            </View>
          }
          <View>
            <Text style={styles.day}>{dayCount}</Text>
          </View>
        </View>
      </View>

    );
  };

  const renderDoneItem = ({ item }) => {
    const dayCount = item.habitDay;
    return (
      <View
        style={[styles.container, { zIndex: 1, borderColor: colors.purple, borderWidth: 1, backgroundColor: colors.black1, alignSelf: "flex-start" }]}
        key={item._id}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{
            height: 40, width: 28, marginRight: 12, marginLeft: -33, zIndex: 2,
            backgroundColor: colors.black1, justifyContent: 'center', alignSelf: 'center'
          }}>
            <Image style={{ height: 28, width: 28, tintColor: colors.purple }}
              source={require('../../../assets/icons/verified.png')} />
          </View>
          {item.habitDesc ?
            <View style={styles.innerCont}>
              <Text style={[styles.title, { marginTop: -2, color: colors.white }]}>{item.habitTitle}</Text>
              <Text style={styles.desc}>{item.habitDesc}</Text>
            </View> :
            <View style={styles.innerCont}>
              <Text style={[styles.title, { marginTop: -2, color: colors.white }]}>{item.habitTitle}</Text>
            </View>
          }
          <View>
            <Text style={[styles.day, { color: colors.white }]}>{dayCount}</Text>
          </View>
        </View>
      </View>

    );
  };

  const items = [];

  for (let i = 1; i <= 10; i++) {
    items.push(
      <View key={i} style={{
        backgroundColor: (doneData.length * 10) / data.length >= i ? colors.purple : colors.white,
        width: 24, aspectRatio: 1, flex: 1, marginTop: 4, marginRight: 2, marginLeft: 2, borderRadius: 4
      }}>
        {Math.floor((doneData.length * 10) / data.length) === i ? <Text style={{ color: colors.white, fontSize: i === 10 ? 12 : 14, fontFamily: "Manrope-Bold", justifyContent: 'center', textAlign: 'center', flex: 1, textAlignVertical: 'center', marginBottom: 4 }}>%{Math.floor(((doneData.length * 10) / data.length) * 10)}</Text> : null}
      </View>
    );
  }


  return (
    <View style={styles.body}>
      <View style={{ backgroundColor: colors.black2, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 24, width: Dimensions.get('window').width }}>
        <TouchableOpacity onPress=
          {() => navigation.goBack()}>
          <View style={{ height: 52, paddingHorizontal: 10, width: 52, justifyContent: 'center', alignItems: 'flex-right' }}>
            <Image style={{ height: 20, width: 20, }}
              source={require('../../../assets/icons/arrow.png')} />
          </View>
        </TouchableOpacity>
        <Image style={{ height: 40, width: 108, marginTop: 8 }}
          source={require('../../../assets/images/logo.png')} />
        <TouchableOpacity onPress=
          {() => handleLogout()}>
          <View style={{ height: 52, paddingHorizontal: 8, width: 52, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Image style={{ height: 24, width: 24, tintColor: colors.purple }}
              source={require('../../../assets/icons/logout.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={[styles.title, { color: colors.purple }]}>{userdata.username}</Text>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 10, marginBottom: 10, backgroundColor: colors.black2 }}></View>
      <Text style={[styles.title, { color: colors.white, alignSelf: 'flex-start', paddingLeft: 16, marginBottom: 6, }]}>Devam Eden Alışkanlıklar ({allData.length})</Text>
      {allData.length === 0 ?
        <View style = {{height: Dimensions.get("window").height / 4, justifyContent: 'center'}}>
          <Text style = {{fontFamily: "Manrope-Medium", fontSize: 14, color: colors.gray}}>Devam eden alışkanlık yok.</Text>
        </View> :
        <FlatList
          data={allData}
          renderItem={renderAllItem}
          keyExtractor={(item) => item._id} // Her öğe için benzersiz key
          showsVerticalScrollIndicator={true}
          pagingEnabled
          snapToAlignment="start"
          snapToInterval={Dimensions.get("window").height / 4} // Sayfanın yarısını kapla
          contentContainerStyle={{ paddingBottom: 8, marginTop: -8, }}
          style={{ maxHeight: Dimensions.get("window").height / 4 }}
        />}
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 16, marginBottom: -8, backgroundColor: colors.black2 }}></View>

      <Text style={[styles.title, { color: colors.white, alignSelf: 'flex-start', paddingLeft: 16, marginBottom: 6, marginTop: 16 }]}>Tamamlanan Alışkınlıklar ({doneData.length})</Text>
      {
        doneData.length === 0 ?
        <View style = {{height: Dimensions.get("window").height / 4, justifyContent: 'center'}}>
          <Text style = {{fontFamily: "Manrope-Medium", fontSize: 14, color: colors.gray}}>Tamamlanan alışkanlık yok.</Text>
        </View> :
        <FlatList
        data={doneData}
        renderItem={renderDoneItem}
        keyExtractor={(item) => item._id} // Her öğe için benzersiz key
        showsVerticalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="start"
        snapToInterval={Dimensions.get("window").height / 4} // Sayfanın yarısını kapla
        contentContainerStyle={{ paddingBottom: 8, marginTop: -8, }}
        style={{ maxHeight: Dimensions.get("window").height / 4 }}
      />}
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 16, marginBottom: 8, backgroundColor: colors.black2 }}></View>
      <Text style={[styles.title, { color: colors.white, alignSelf: 'flex-start', paddingLeft: 16, marginBottom: 8, }]}>İstatistikler</Text>
      <Text style={[styles.title, { color: colors.white, fontFamily: "Manrope-Regular", alignSelf: 'flex-start', paddingLeft: 16, marginBottom: 6, }]}>Oluşturulan Toplam Alışkanlık Sayısı: {data.length}</Text>
      <Text style={[styles.title, { color: colors.white, fontFamily: "Manrope-Regular", alignSelf: 'flex-start', paddingLeft: 16, marginBottom: 6, }]}>Tamamlanan Toplam Alışkanlık Sayısı: {doneData.length}</Text>
      <View style={{ flexDirection: "row", marginLeft: 14, marginRight: 14 }}>{items}</View>
    </View>
  );
}

export default UserPage;