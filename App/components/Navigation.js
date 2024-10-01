import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../utils/ThemeContext'; // Importa o hook de tema
import { View } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Map from '../pages/Map';
import Report from '../pages/Report';
import Settings from '../pages/Config';

const Stack = createStackNavigator();

export default function Navigation() {
  // Usa o tema do contexto
  const { colorScheme } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colorScheme.textPrimary,
          tabBarInactiveTintColor: colorScheme.textSecondary,
          tabBarActiveBackgroundColor: colorScheme.panelBackground,
          tabBarInactiveBackgroundColor: colorScheme.panelBackground,
        }}
      >
        <Stack.Screen
          name="Map"
          options={{ tabBarIcon: ({ color }) => <Entypo name="map" size={24} color={color} /> }}
          component={Map}
        />

        <Stack.Screen
          name="Reportar"
          options={{ tabBarIcon: ({ color }) => <MaterialIcons name="report-gmailerrorred" size={24} color={color} /> }}
          component={Report}
        />

        <Stack.Screen
          name="Configuracoes"
          options={{ tabBarIcon: ({ color }) => <FontAwesome name="gears" size={24} color={color} /> }}
          component={Settings}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
