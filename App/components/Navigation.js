import React, { useEffect } from 'react';
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
import Settings from '../pages/Config'

const Stack = createStackNavigator();

export default function Navigation() {
  // Usa o tema do contexto
  const { changeTheme ,colorScheme } = useTheme();
  
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
          headerShown: true,
          headerTintColor: colorScheme.textSecondary,
          headerStyle: {
            backgroundColor: colorScheme.panelBackground,
            height: 80,
          },
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image
                source={require('../assets/Logo.png')}
                style={{ width: 70, height: 70 }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      >
        <Stack.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
            headerShown: true,
          }}
          component={Home}
        />

        <Stack.Screen
          name="Reportar"
          options={{
            tabBarIcon: ({ color }) => <MaterialIcons name="report-gmailerrorred" size={24} color={color} />,
            headerShown: true,
          }}
          component={Report}

        />
        <Stack.Screen
          name="Suas Reclamações"
          options={{
            tabBarIcon: ({ color }) => <MaterialIcons name="report-gmailerrorred" size={24} color={color} />,
            headerShown: true

          }}
          component={Yours}

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
