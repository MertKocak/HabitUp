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
            headerTitleStyle: {
              fontSize: 18,
            },
            headerStyle: { backgroundColor: colors.black2 },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTintColor: colors.purple,
          })}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={({ navigation }) => ({
            title: 'HabitUp',
            headerShown: false,
            headerTitleStyle: {
              fontSize: 18,
            },
            headerStyle: { backgroundColor: colors.black2 },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTintColor: colors.purple,
          })}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={({ navigation }) => ({
            title: 'HabitUp',
            headerShown: false,
            headerTitleStyle: {
              fontSize: 18,
            },
            headerStyle: { backgroundColor: colors.black2 },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTintColor: colors.purple,
            headerRight: () => (
              <TouchableOpacity onPress=
                {() => navigation.navigate('AddHabitPage')}>
                <View style={{ height: 40, backgroundColor: "red",width: 40, justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Image style={{ height: 22, width: 22, }}
                    source={require('./assets/icons/add-button.png')} />
                </View>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress=
                {() => navigation.navigate('UserPage')}>
  
                <View style={{height: 40, width: 40, justifyContent: 'center', alignItems: 'flex-start' }}>
                  <Image style={{ height: 20, width: 20, tintColor: colors.purple }}
                    source={require('./assets/icons/trash.png')} />
                </View>
              </TouchableOpacity>
            ),
          })}
        />
      
        <Stack.Screen
          name="UserPage"
          component={UserPage}
          options={({ navigation }) => ({
            title: 'kullanıcı',
            headerTitleStyle: {
              fontSize: 18,
            },
            headerStyle: { backgroundColor: colors.black2 },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTintColor: colors.purple,
            headerRight: () => (
              <TouchableOpacity onPress=
                {() => navigation.navigate('AddHabitPage')}>
                <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Image style={{ height: 22, width: 22, }}
                    source={require('./assets/icons/trash.png')} />
                </View>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="AddHabitPage" component={AddHabitPage} options={({ navigation }) => ({
          title: 'HabitUp',
          headerShown: false,
          headerTitleStyle: {
            fontSize: 18,
          },
          headerStyle: { backgroundColor: colors.black2 },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: colors.purple,
          headerLeft: () => (
            <TouchableOpacity onPress=
              {() => navigation.goBack()}>

              <View style={{height: 40, width: 40, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Image style={{ height: 20, width: 20, tintColor: colors.purple }}
                  source={require('./assets/icons/arrow.png')} />
              </View>
            </TouchableOpacity>
          ),
        })} />
        <Stack.Screen name="HabitEditPage" component={HabitEditPage} options={({ navigation }) => ({
          title: 'HabitUp',
          headerShown: false,
          headerTitleStyle: {
            fontSize: 18,
          },
          headerStyle: { backgroundColor: colors.black2 },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: colors.purple,
          headerLeft: () => (
            <TouchableOpacity onPress=
              {() => navigation.goBack()}>

              <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Image style={{ height: 20, width: 20, tintColor: colors.purple }}
                  source={require('./assets/icons/arrow.png')} />
              </View>
            </TouchableOpacity>
          ),
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;