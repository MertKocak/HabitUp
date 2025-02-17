import * as React from 'react';
import { Button, ActivityIndicator ,Image, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/pages/HomePage';
import AddHabitPage from './src/pages/AddHabitPage';
import colors from './src/colors';
import HabitEditPage from './src/pages/HabitEditPage';
import LoginPage from './src/pages/LoginPage';
import RegisterPage from './src/pages/RegisterPage';
import UserPage from './src/pages/UserPage';
import MyHabitsPage from './src/pages/MyHabitsPage';
import MyStats from './src/pages/MyStats';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Kullanıcının login durumunu kontrol et
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!token); // Eğer token varsa, kullanıcı giriş yapmış demektir
      } catch (error) {
        console.error('Token kontrol edilirken hata oluştu:', error);
      } finally {
        setLoading(false); // Yükleme bitti
      }
    };

    checkLoginStatus();
  }, []);

  // Yükleme devam ediyorsa activity indicator gösteriyoruz
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'HomePage' : 'LoginPage'}>
      <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={({ navigation }) => ({
            title: 'HabitUp',
            headerShown: false,
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={({ navigation }) => ({
            title: 'HabitUp',
            headerShown: false,
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={({ navigation }) => ({
            title: 'HabitUp',
            headerShown: false,
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="UserPage"
          component={UserPage}
          options={({ navigation }) => ({
            title: 'kullanıcı',
            headerShown: false,
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="MyHabitsPage"
          component={MyHabitsPage}
          options={({ navigation }) => ({
            title: 'MyHabitsPage',
            headerShown: false,
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="MyStats"
          component={MyStats}
          options={({ navigation }) => ({
            title: 'MyStats',
            headerShown: false,
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen name="AddHabitPage" component={AddHabitPage} options={({ navigation }) => ({
          title: 'HabitUp',
          headerShown: false,
          headerShadowVisible: false,
        })} />
        <Stack.Screen name="HabitEditPage" component={HabitEditPage} options={({ navigation }) => ({
          title: 'HabitUp',
          headerShown: false,
          headerShadowVisible: false,
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;