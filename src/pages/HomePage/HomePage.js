import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AddHabitPage from '../AddHabitPage';
import styles from "./HomePage.style"

export default function HomePage({navigation}) {
  return (
    <View style={styles.body}>
      <View>
        <Text style = {styles.text}>
          Alışkanlık Ekle
        </Text>
      </View>
    </View>
  );
}

export default HomePage;