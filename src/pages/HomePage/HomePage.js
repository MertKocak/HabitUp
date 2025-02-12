import { StyleSheet, Text, Image, TouchableOpacity, View, ActivityIndicator, ScrollView, Dimensions, SafeAreaView } from 'react-native';
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
      try {
        const response = await axios.get(`https://habitup-backend.onrender.com/habitDone/${userdata._id}`, {
          params: { userId: userdata._id, habitIsDone: false}
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
    fetchData();
  }, [userdata._id]);

  return (
    <ScrollView style={{ backgroundColor: colors.black1 }}>
      <SafeAreaView style={styles.body}>
        <View style={{ backgroundColor: colors.black2, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 4, width: Dimensions.get('window').width }}>
          <TouchableOpacity onPress=
            {() => navigation.navigate('UserPage')}>
            <View style={{ height: 52, paddingHorizontal: 8, width: 52, justifyContent: 'center', alignItems: 'flex-right' }}>
              <Image style={{ height: 24, width: 24, tintColor: colors.purple }}
                source={require('../../../assets/icons/user.png')} />
            </View>
          </TouchableOpacity>
          <Image style={{ height: 40, width: 108, marginTop: 8 }}
            source={require('../../../assets/images/logo.png')} />
          <TouchableOpacity onPress=
            {() => navigation.navigate('AddHabitPage')}>
            <View style={{ height: 52, paddingHorizontal: 8, width: 52, justifyContent: 'center', alignItems: 'flex-end' }}>
              <Image style={{ height: 22, width: 22, }}
                source={require('../../../assets/icons/add-button.png')} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 6, marginBottom: 4, width: Dimensions.get('window').width - 32 }}>
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
              <View style={{ flexDirection: "row" , marginTop: 0}}>
                <Text style={{ textAlign: 'center', fontSize: 14, marginRight: 4, marginTop: 1, fontFamily: "Manrope-Regular", color: colors.white }}>
                  bir
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 14, marginRight: 4, fontFamily: "Manrope-Bold", color: colors.purple }}>
                  alışkanlıkla
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 14,marginTop: 1, fontFamily: "Manrope-Regular", color: colors.white }}>
                  başlar!
                </Text>
              </View>
            </View>
          ) : <HabitCard navigation={navigation} data={data} />
          }
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}