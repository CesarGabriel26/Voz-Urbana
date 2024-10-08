import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../utils/ThemeContext'; // Importa o hook de tema
import { StatusBar, Platform, Image, View } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Yours from '../pages/YourReports';
import Home from '../pages/Home';
import Report from '../pages/Report';
import Peticoes from '../pages/Peticoes'
import Settings from '../pages/Config'
import Login from '../pages/Login';
import CadUser from '../pages/cadUser';
import Map from '../pages/Map';

const Stack = createStackNavigator();

export default function Navigation() {
  // Usa o tema do contexto
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
        screenOptions={{
          headerTintColor: colorScheme.textSecondary,
          headerStyle: {
            backgroundColor: colorScheme.panelBackground,
            height: 80,
          },
          headerTitleAlign: 'center',

        }}
      >
        <Stack.Screen
          name="Login"
          options={{
            tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
            headerShown: true,
          }}
          component={Login}
        />
        <Stack.Screen
          name="Cadastro"
          options={{
            tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
          }}
          component={CadUser}
        />

        <Stack.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
            headerLeft: null, // Remove a seta de voltar
            gestureEnabled: false, // Desabilita o gesto de voltar
          }}
          component={Home}

        />

        <Stack.Screen
          name="Reportar"
          options={{
            tabBarIcon: ({ color }) => <MaterialIcons name="report-gmailerrorred" size={24} color={color} />,
          }}
          component={Report}

        />
        <Stack.Screen
          name="Suas Reclamações"
          options={{
            tabBarIcon: ({ color }) => <MaterialIcons name="report-gmailerrorred" size={24} color={color} />,
          }}
          component={Yours}
        />

        <Stack.Screen
          name="Petições"
          options={{
            tabBarIcon: ({ color }) => <MaterialIcons name="report-gmailerrorred" size={24} color={color} />,
          }}
          component={Peticoes}
        />

        <Stack.Screen
          name="Mapa"
          options={{
            tabBarIcon: ({ color }) => <MaterialIcons name="report-gmailerrorred" size={24} color={color} />,
          }}
          component={Map}
        />

        <Stack.Screen
          name="Configuraçoes"
          options={{ tabBarIcon: ({ color }) => <FontAwesome name="gears" size={24} color={color} /> }}
          component={Settings}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
