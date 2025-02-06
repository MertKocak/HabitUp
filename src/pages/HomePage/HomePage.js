import { StyleSheet, Text, Image, TouchableOpacity, View, ScrollView, Dimensions, SafeAreaView } from 'react-native';
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

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      await axios.post('https://habitup-backend.onrender.com/userdata', { token: token }).then(res => setUserdata(res.data.data));
      try {
        const response = await axios.get('https://habitup-backend.onrender.com/habit');
        const reversedData = response.data.reverse();
        setData(reversedData);
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
  }, []);

  return (
    <ScrollView style={{ backgroundColor: colors.black1 }}>
      <SafeAreaView style={styles.body}>
        <View style={{backgroundColor: colors.black2, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 4, width: Dimensions.get('window').width }}>
          <TouchableOpacity onPress=
            {() => navigation.navigate('UserPage')}>
            <View style={{ height: 52, paddingHorizontal: 8, width: 52, justifyContent: 'center', alignItems: 'flex-right' }}>
              <Image style={{ height: 24, width: 24, tintColor: colors.purple }}
                source={require('../../../assets/icons/user.png')} />
            </View>
          </TouchableOpacity>
          <Image style={{ height: 40, width: 108, marginTop: 8}}
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
            {formattedDate.toString()}
          </Text>
        </View>
        <View>
          <HabitCard navigation={navigation} data={data} /> {/* HabitCard'a data geçiyoruz */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}