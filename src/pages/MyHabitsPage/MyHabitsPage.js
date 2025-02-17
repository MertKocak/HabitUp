import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal, ScrollView, ActivityIndicator, FlatList, ToastAndroid, Image, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import styles from "./MyHabitsPage.style";
import HomePage from '../HomePage';
import colors from '../../colors';
import { all, default as axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mt } from 'date-fns/locale';

export default function MyHabitsPage({ navigation, progressData }) {
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
    fetchDataAll();
    fetchDataDone();
  }, [userdata._id, allData, doneData]);

  const goToEditPage = (id, title, desc, day) => {
    navigation.navigate('HabitEditPage', { id, title, desc, day });
  };

  const renderAllItem = ({ item }) => {
    const dayCount = item.habitDay;
    return (
      <TouchableOpacity onPress={() => goToEditPage(item._id, item.habitTitle, item.habitDesc, item.habitDay)}>
        <View
          style={[styles.container, { zIndex: 2, marginLeft: 0, width: Dimensions.get('window').width - 82, alignSelf: "flex-start", borderWidth: 0.5, backgroundColor: colors.black2 }]}
          key={item._id}
        >
          <View style={{ flexDirection: "row", alignItems: 'center'}}>
            <Image style={{ height: 18, width: 18, tintColor: colors.gray, marginRight: 16 }}
              source={require('../../../assets/icons/edit.png')} />
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
              <Text style={styles.day}>{dayCount}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDoneItem = ({ item }) => {
    const dayCount = item.habitDay;
    return (
      <TouchableOpacity onPress={() => goToEditPage(item._id, item.habitTitle, item.habitDesc, item.habitDay)}>
        <View
          style={[styles.container, { zIndex: 2, marginLeft: 2, width: Dimensions.get('window').width - 82, alignSelf: "flex-start", borderWidth: 0.5, backgroundColor: colors.black2 }]}
          key={item._id}
        >
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Image style={{ height: 18, width: 18, tintColor: colors.gray, marginRight: 16 }}
              source={require('../../../assets/icons/edit.png')} />
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
              <Text style={styles.day}>{dayCount}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

    );
  };

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
      <View
        style={[styles.container, { marginLeft: 16, width: Dimensions.get('window').width - 32, height: Dimensions.get('window').height / 2 - 80, alignSelf: "flex-start", zIndex: 1, borderWidth: 1, borderColor: colors.white, backgroundColor: colors.black1 }]}
      >
        <Text style={[styles.title, { zIndex: 2, color: colors.white, alignSelf: 'flex-start', paddingLeft: 0, marginTop: -28, backgroundColor: colors.black1 }]}>   Devam Eden Alışkanlıklar: {allData.length}   </Text>

        <View style={{ flexDirection: "row" }}>
          <View style={{
            height: 36, width: 28, marginRight: 8, marginLeft: -32, zIndex: 2,
            backgroundColor: colors.black1, justifyContent: 'center', alignSelf: 'flex-start'
          }}>
            <Image style={{ height: 24, width: 24, tintColor: colors.white }}
              source={require('../../../assets/icons/hour.png')} />
          </View>
          {allData.length === 0 ?
            <View style={{ height: Dimensions.get("window").height / 2 - 114, marginTop: 10, width: Dimensions.get("window").width - 78, justifyContent: 'center' }}>
              <Text style={{
                fontFamily: "Manrope-Medium", fontSize: 14, color: colors.gray,
                textAlign: 'center'
              }}>Devam eden alışkanlık yok.</Text>
            </View> :
            <FlatList
              data={allData}
              renderItem={renderAllItem}
              keyExtractor={(item) => item._id} // Her öğe için benzersiz key
              showsVerticalScrollIndicator={false}
              pagingEnabled
              snapToAlignment="start"
              snapToInterval={Dimensions.get("window").height / 2 - 114} // Sayfanın yarısını kapla
              contentContainerStyle={{ paddingBottom: 2, marginTop: 0, zIndex: 2, backgroundColor: colors.black1 }}
              style={{ maxHeight: Dimensions.get("window").height / 2 - 114 }}
            />}
        </View>

      </View>
      <View
        style={[styles.container, { marginLeft: 16, width: Dimensions.get('window').width - 32, height: Dimensions.get('window').height / 2 - 80, alignSelf: "flex-start", zIndex: 1, marginTop: 24, borderWidth: 1, borderColor: colors.purple, backgroundColor: colors.black1 }]}
      >
        <Text style={[styles.title, { zIndex: 2, color: colors.purple, alignSelf: 'flex-start', paddingLeft: 0, marginTop: -29, backgroundColor: colors.black1 }]}>   Tamamlanan Alışkanlıklar: {doneData.length}   </Text>

        <View style={{ flexDirection: "row" }}>
          <View style={{
            height: 36, width: 28, marginRight: 8, marginLeft: -33, zIndex: 2,
            backgroundColor: colors.black1, justifyContent: 'center', alignSelf: 'flex-start'
          }}>
            <Image style={{ height: 26, width: 26, tintColor: colors.purple }}
              source={require('../../../assets/icons/checkmark.png')} />
          </View>
          {doneData.length === 0 ?
            <View style={{ height: Dimensions.get("window").height / 2 - 114, marginTop: 10, width: Dimensions.get("window").width - 78, justifyContent: 'center' }}>
              <Text style={{
                fontFamily: "Manrope-Medium", fontSize: 14, color: colors.gray,
                textAlign: 'center'
              }}>Tamamlanan alışkanlık yok.</Text>
            </View> :
            <FlatList
              data={doneData}
              renderItem={renderDoneItem}
              keyExtractor={(item) => item._id} // Her öğe için benzersiz key
              showsVerticalScrollIndicator={false}
              pagingEnabled
              snapToAlignment="start"
              snapToInterval={Dimensions.get("window").height / 2 - 114} // Sayfanın yarısını kapla
              contentContainerStyle={{ paddingBottom: 2, marginTop: 0, zIndex: 2, backgroundColor: colors.black1 }}
              style={{ maxHeight: Dimensions.get("window").height / 2 - 114 }}
            />}
        </View>
      </View>
    </View>
  );
}

export default MyHabitsPage;