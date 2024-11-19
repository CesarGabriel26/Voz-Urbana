import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, Platform, TouchableOpacity } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import Login from '../pages/Iniciais/Login';
import SingUp from '../pages/Iniciais/SingUp';
import Home from '../pages/Usuario/Home';
import { useTheme } from '../utils/ThemeContext';

const Stack = createStackNavigator();

export default function Routes() {
  const { colorScheme } = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#0A62AC');
      StatusBar.setBarStyle('light-content');
    } else if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('light-content');
    }
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator
        screenOptions={({ navigation }) => ({
            headerTintColor: colorScheme.Text.text,
            headerStyle: {
              backgroundColor: colorScheme.Body_bg,
              height: 80,
            },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Configurações')}
              style={{
                marginRight: 25
              }}
            >
              <FontAwesome name="gear" size={30} color="white" />
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="SingUp"
          component={SingUp}
          options={{
            headerShown: false
          }}
        />


        <Stack.Screen
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
