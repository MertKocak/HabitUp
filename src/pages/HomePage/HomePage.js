import { StyleSheet, Text, TouchableOpacity, View , ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import AddHabitPage from '../AddHabitPage';
import styles from "./HomePage.style";
import { default as axios } from 'axios';
import HabitCard from '../../components/HabitCard';
import colors from '../../colors';

export default function HomePage({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://10.0.2.2:3000/habit')
      .then(response => {
        const reversedData = response.data.reverse();
        setData(reversedData);
      })
      .catch(error => {
        if (error.response) {
          console.error('Response Error:', error.response.data);
          console.error('Status Code:', error.response.status);
        } else {
          console.error('Error:', error.message);
        }
      });
  }, []);

  return (
    <ScrollView style={{backgroundColor: colors.black1}}>
      <View style={styles.body}>
        <View>
          <HabitCard></HabitCard>
        </View>
      </View>
    </ScrollView>
  );
}

export default HomePage;