import { StyleSheet, Text, Image, TouchableOpacity, Modal, View, ActivityIndicator, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddHabitPage from '../AddHabitPage';
import styles from "./HomePage.style";
import { default as axios } from 'axios';
import HabitCard from '../../components/HabitCard';
import colors from '../../colors';
import { format } from "date-fns";
import { tr } from "date-fns/locale"; // Türkçe dil desteği
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePage({ navigation, route }) {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'd MMMM yyyy, EE', { locale: tr });

  const [modalVisible, setModalVisible] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  const [data, setData] = useState([]);
  const [userdata, setUserdata] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      await axios.post('https://habitup-backend.onrender.com/userdata', { token: token }).then(res => setUserdata(res.data.data)).catch(error => {
        if (error.response) {
          alert('Sunucu hatası: ' + error.response.data ? error.response.data : "Sunucuya bağlanılamıyor.");
        } else {
          alert('Ağ bağlantı hatası: ' + error.message ? error.message : "Lütfen ağ bağlantınızı kontrol ediniz.");
        }
      });
    };
    const fetchHabit = async () => {
      try {
        const response = await axios.get(`https://habitup-backend.onrender.com/habitDone/${userdata._id}`, {
          params: { userId: userdata._id, habitIsDone: false }
        });
        const reversedData = await response.data.reverse();
        await setData(reversedData);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          console.error('Response Error:', error.response.data);
          console.error('Status Code:', error.response.status);
        } else {
          console.error('Error:', error.message);
        }
      }
    };
    const checkFirstLaunch = async () => {
      const firstLaunch = await AsyncStorage.getItem('firstLaunch');
      if (firstLaunch === true) {
        setIsFirstLaunch(true);
        setModalVisible(true);
        await AsyncStorage.setItem('firstLaunch', 'false');
      }
    };
    checkFirstLaunch();
    fetchHabit();
    fetchData();
  }, [userdata._id]);

  const closeModal = async () => {
    setModalVisible(false);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.black1 }}>
      <SafeAreaView style={styles.body}>
        <View style={{ backgroundColor: colors.black2, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 4, width: Dimensions.get('window').width }}>
          <TouchableOpacity onPress=
            {() => navigation.navigate('UserPage')}>
            <View style={{ height: 52, paddingHorizontal: 6, width: 52, justifyContent: 'center', alignItems: 'flex-right' }}>
              <Image style={{ height: 24, width: 24, tintColor: colors.purple }}
                source={require('../../../assets/icons/user.png')} />
            </View>
          </TouchableOpacity>
          <Image style={{ height: 40, width: 96, marginTop: 8 }}
            source={require('../../../assets/images/logo.png')} />
          <TouchableOpacity onPress=
            {() => navigation.navigate('AddHabitPage')}>
            <View style={{ height: 52, paddingHorizontal: 8, width: 52, justifyContent: 'center', alignItems: 'flex-end' }}>
              <Image style={{ height: 22, width: 22, }}
                source={require('../../../assets/icons/add-button.png')} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, marginBottom: 4, width: Dimensions.get('window').width - 32 }}>
          <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center', marginLeft: 1 }} onPress={() => setModalVisible(true)}>
            <Image style={{ height: 16, width: 16, tintColor: colors.white, alignSelf: 'center', marginRight: 8 }}
              source={require('../../../assets/icons/info.png')} />
          </TouchableOpacity>
          <Text style={{ color: colors.white, fontSize: 12, fontFamily: "Manrope-Medium" }}>
            {formattedDate}
          </Text>
        </View>
        <View>
          {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#B836FC" />
            </View>
          ) : data.length === 0 ? (
            <View style={{ justifyContent: 'center', height: Dimensions.get("window").height - 168 }}>
              <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: "Manrope-Regular", color: colors.white }}>
                Başarıya giden yol,
              </Text>
              <View style={{ flexDirection: "row", marginTop: 0 }}>
                <Text style={{ textAlign: 'center', fontSize: 14, marginRight: 4, marginTop: 1, fontFamily: "Manrope-Regular", color: colors.white }}>
                  bir
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 14, marginRight: 4, fontFamily: "Manrope-Bold", color: colors.purple }}>
                  alışkanlıkla
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 14, marginTop: 1, fontFamily: "Manrope-Regular", color: colors.white }}>
                  başlar!
                </Text>
              </View>
            </View>
          ) : <HabitCard navigation={navigation} data={data} />
          }
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => closeModal()}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Uygulamayı kullanmaya başlarken...</Text>
              <Text style={styles.modalText}>HabitUp, edinmek istediğin alışkanlıkları takip etmene yardımcı olacak.</Text>
              <Text style={styles.modalText}>Her gün alışkanlıkların için belirlediğin hedefleri tamamladığında 'Up' butonuna basarak ilerlemeni kaydedebilirsin. Eğer o gün tamamlamadıysan (ki bu çok normal bir durum), 'Çarpı' butonuna basarak durumu kaydedebilirsin.</Text>
              <Text style={styles.modalText}>Bu şekilde, alışkanlıklarını takip edebilir ve ilerlemeni gözlemleyebilirsin.</Text>
              <Text style={styles.modalText}>Unutma, koyduğun hedefleri tamamlayan da sensin tamamlayamayan da. Sonuç ne olursa olsun gösterdiğin çaba için kendinle gurur duymalısın.</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.modalText, {marginBottom: 0}]}>Anasayfadaki yer alan</Text>
                <Image style={{ height: 16, width: 16, tintColor: colors.white, marginTop: 3, marginRight: 4, marginLeft: 4}}
                  source={require('../../../assets/icons/info.png')} />
                <Text style={[styles.modalText, {marginBottom: 0}]}>ikonuyla</Text>
              </View>
              <Text style={[styles.modalText, {marginTop: 0}]}>bu bilgilendirme mesajına dilediğin zaman ulaşabilirsin.</Text>

              <TouchableOpacity onPress={() => closeModal()}>
                <View style={styles.addButton}>
                  <Text style={styles.addButtonText}>
                    Anladım
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
}

export default HomePage;