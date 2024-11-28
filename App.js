import * as React from 'react';
import { Button, Image, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/pages/HomePage';
import AddHabitPage from './src/pages/AddHabitPage';
import colors from './src/colors';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={({ navigation }) => ({
            title: 'HabitUp',
            headerTitleStyle: {
              fontSize: 16,
            },
            headerStyle: { backgroundColor: colors.black2 },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTintColor: colors.purple,
            headerRight: () => (
              <TouchableOpacity onPress=
                {() => navigation.navigate('AddHabitPage')}>
                  <Image style={{ height: 24, width: 24, tintColor: colors.secondaryColor }}
                    source={require('./assets/icons/add-button.png')} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="AddHabitPage" component={AddHabitPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

