import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../utils/ThemeContext'; // Importa o hook de tema

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Map from '../pages/Map';
import Report from '../pages/Report';
import Settings from '../pages/Config';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  // Usa o tema do contexto
  const { colorScheme } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colorScheme.textPrimary,
          tabBarInactiveTintColor: colorScheme.textSecondary,
          tabBarActiveBackgroundColor: colorScheme.panelBackground,
          tabBarInactiveBackgroundColor: colorScheme.panelBackground,
        }}
      >
        <Tab.Screen
          name="Map"
          options={{ tabBarIcon: ({ color }) => <Entypo name="map" size={24} color={color} /> }}
          component={Map}
        />

        <Tab.Screen
          name="Reportar"
          options={{ tabBarIcon: ({ color }) => <MaterialIcons name="report-gmailerrorred" size={24} color={color} /> }}
          component={Report}
        />

        <Tab.Screen
          name="Configuracoes"
          options={{ tabBarIcon: ({ color }) => <FontAwesome name="gears" size={24} color={color} /> }}
          component={Settings}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
