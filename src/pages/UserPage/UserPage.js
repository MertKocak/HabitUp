import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal, ScrollView, ActivityIndicator, FlatList, ToastAndroid, Image, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import styles from "./UserPage.style";
import HomePage from '../HomePage';
import colors from '../../colors';
import { all, default as axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mt } from 'date-fns/locale';

export default function UserPage({ navigation, progressData }) {


  const [userdata, setUserdata] = useState('');
  const [allData, setallData] = useState([]);
  const [doneData, setdoneData] = useState([]);
  const [data, setdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);


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

  const renderAllItem = ({ item }) => {
    const dayCount = item.habitDay;
    return (
      <TouchableOpacity onPress={() => handleDelete(item._id, 2)}>
        <View
          style={[styles.container, { zIndex: 2, marginLeft: 0, width: Dimensions.get('window').width - 82, alignSelf: "flex-start", borderWidth: 0.5, backgroundColor: colors.black2 }]}
          key={item._id}
        >
          <View style={{ flexDirection: "row" }}>
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
      <TouchableOpacity onPress={() => handleDelete(item._id, 1)}>
        <View
          style={[styles.container, { zIndex: 2, marginLeft: 2, width: Dimensions.get('window').width - 82, alignSelf: "flex-start", borderWidth: 0.5, backgroundColor: colors.black2 }]}
          key={item._id}
        >
          <View style={{ flexDirection: "row" }}>
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

  const [deleteModalDone, setDeleteModalDone] = useState(false);
  const [deleteModalCon, setDeleteModalCon] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(0);

  const deletefunction = async (id) => {
    axios
      .delete(`https://habitup-backend.onrender.com/habit/${id}`)
      .then(res => {
        ToastAndroid.show('Alışkanlık silindi!', ToastAndroid.SHORT);
        navigation.replace("UserPage");
      })
      .catch(e => console.error("Hata:", e));
  }

  function handleDelete(id, number) {
    if (number === 1) {
      setSelectedItemId(id);
      setDeleteModalDone(true);
    }
    else if (number === 2) {
      setSelectedItemId(id);
      setDeleteModalCon(true);
    }
  }

  return (
    <View style={styles.body}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalCon}
        onRequestClose={() => setDeleteModalCon(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Devam eden alışkanlık silinsin mi?</Text>
            <Text style={styles.modalText}>Bu işlem geri alınamaz.</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setDeleteModalCon(false)}>
                <View style={[styles.addButtonHalf, { marginRight: 16, backgroundColor: colors.black2, borderWidth: 0.6, borderColor: colors.gray }]}>
                  <Text style={styles.addButtonText}>
                    Vazgeç
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletefunction(selectedItemId)}>
                <View style={styles.addButtonHalf}>
                  <Text style={styles.addButtonText}>
                    Sil
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalDone}
        onRequestClose={() => setDeleteModalDone(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tamamlanmış alışkanlık silinsin mi?</Text>
            <Text style={styles.modalText}>Bu işlem geri alınamaz.</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setDeleteModalDone(false)}>
                <View style={[styles.addButtonHalf, { marginRight: 16, backgroundColor: colors.black2, borderWidth: 0.6, borderColor: colors.gray }]}>
                  <Text style={styles.addButtonText}>
                    Vazgeç
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletefunction(selectedItemId)}>
                <View style={styles.addButtonHalf}>
                  <Text style={styles.addButtonText}>
                    Sil
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
      <View style={{ backgroundColor: colors.black2, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 24, width: Dimensions.get('window').width }}>
        <TouchableOpacity onPress=
          {() => navigation.goBack()}>
          <View style={{ height: 52, paddingHorizontal: 1, width: 52, justifyContent: 'center', alignItems: 'flex-right' }}>
            <Image style={{ height: 30, width: 30, tintColor: colors.purple }}
              source={require('../../../assets/icons/arrow.png')} />
          </View>
        </TouchableOpacity>
        <Image style={{ height: 40, width: 108, marginTop: 8 }}
          source={require('../../../assets/images/logo.png')} />
        <TouchableOpacity onPress=
          {() => handleLogout()}>
          <View style={{ height: 52, paddingHorizontal: 6, width: 52, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Image style={{ height: 22, width: 22, tintColor: colors.purple }}
              source={require('../../../assets/icons/logout.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 16, marginTop: -12, alignSelf: 'flex-start' }}>
        <View style={{ backgroundColor: colors.purple, height: 24, width: 24, justifyContent: 'center', borderRadius: 50, alignItems: 'center', marginRight: 8, }}>
          <Image style={{ height: 18, width: 18, tintColor: colors.black1 }}
            source={require('../../../assets/icons/user.png')} />
        </View>
        <Text style={[styles.title, { color: colors.purple }]}>{userdata.username}</Text>
      </View>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 10, marginBottom: 10, backgroundColor: colors.black2 }}></View>
      <View
        style={[styles.container, { marginLeft: 16, width: Dimensions.get('window').width - 32, height: Dimensions.get('window').height / 4, alignSelf: "flex-start", zIndex: 1, borderWidth: 1, borderColor: colors.white, backgroundColor: colors.black1 }]}
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
            <View style={{ height: Dimensions.get("window").height / 5, marginTop: 10, width: Dimensions.get("window").width - 78, justifyContent: 'center' }}>
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
              snapToInterval={Dimensions.get("window").height / 4} // Sayfanın yarısını kapla
              contentContainerStyle={{ paddingBottom: 2, marginTop: 0, zIndex: 2, backgroundColor: colors.black1 }}
              style={{ maxHeight: Dimensions.get("window").height / 4.8 }}
            />}
        </View>

      </View>
      <View
        style={[styles.container, { marginLeft: 16, width: Dimensions.get('window').width - 32, height: Dimensions.get('window').height / 4, alignSelf: "flex-start", zIndex: 1, marginTop: 16, borderWidth: 1, borderColor: colors.purple, backgroundColor: colors.black1 }]}
      >
        <Text style={[styles.title, { zIndex: 2, color: colors.purple, alignSelf: 'flex-start', paddingLeft: 0, marginTop: -28, backgroundColor: colors.black1 }]}>   Tamamlanan Alışkanlıklar: {doneData.length}   </Text>

        <View style={{ flexDirection: "row" }}>
          <View style={{
            height: 36, width: 28, marginRight: 8, marginLeft: -34, zIndex: 2,
            backgroundColor: colors.black1, justifyContent: 'center', alignSelf: 'flex-start'
          }}>
            <Image style={{ height: 26, width: 26, tintColor: colors.purple }}
              source={require('../../../assets/icons/checkmark.png')} />
          </View>
          {doneData.length === 0 ?
            <View style={{ height: Dimensions.get("window").height / 5, marginTop: 10, width: Dimensions.get("window").width - 78, justifyContent: 'center' }}>
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
              snapToInterval={Dimensions.get("window").height / 4} // Sayfanın yarısını kapla
              contentContainerStyle={{ paddingBottom: 2, marginTop: 0, zIndex: 2, backgroundColor: colors.black1 }}
              style={{ maxHeight: Dimensions.get("window").height / 4.8 }}
            />}
        </View>

      </View>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 16, marginBottom: 8, backgroundColor: colors.black2 }}></View>
      <Text style={[styles.title, { color: colors.white, alignSelf: 'flex-start', paddingLeft: 16, marginBottom: 8, }]}>İstatistikler</Text>

      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <View style={{ backgroundColor: colors.black2, padding: 8, paddingLeft: 16, paddingRight: 16, flexDirection: "column", borderRadius: 6, width: (Dimensions.get("window").width - 48) / 2, borderWidth: 0.6, borderColor: colors.gray }}>
          <Text style={[styles.title, { fontSize: 12, color: colors.white, fontFamily: "Manrope-Medium", alignSelf: 'center', textAlign: 'center' }]}>Oluşturulan Toplam Alışkanlık Sayısı</Text>
          <View style={{ height: 0.8, width: (Dimensions.get('window').width - 112) / 2, marginTop: 10, marginBottom: 8, backgroundColor: colors.gray }}></View>
          <Text style={[styles.title, { fontSize: 14, color: colors.white, fontFamily: "Manrope-Bold", alignSelf: 'center', marginTop: -2 }]}>{data.length}</Text>
        </View>

        <View style={{ backgroundColor: colors.black2, padding: 8, paddingLeft: 16, paddingRight: 16, flexDirection: "column", borderRadius: 6, width: (Dimensions.get("window").width - 48) / 2, marginLeft: 16, borderWidth: 0.6, borderColor: colors.gray }}>
          <Text style={[styles.title, { fontSize: 12, color: colors.white, fontFamily: "Manrope-Medium", alignSelf: 'center', textAlign: 'center' }]}>Tamamlanan Toplam Alışkanlık Sayısı</Text>
          <View style={{ height: 0.8, width: (Dimensions.get('window').width - 112) / 2, marginTop: 10, marginBottom: 8, backgroundColor: colors.gray }}></View>
          <Text style={[styles.title, { fontSize: 14, color: colors.white, fontFamily: "Manrope-Bold", alignSelf: 'center', marginTop: -2 }]}>{doneData.length}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 14, marginRight: 14 }}>{items}</View>
    </View>
  );
}

export default UserPage;