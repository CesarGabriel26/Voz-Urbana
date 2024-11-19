import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, Platform, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/ThemeContext';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import Login from '../pages/Iniciais/Login';
import SingUp from '../pages/Iniciais/SingUp';

import Home from '../pages/Usuario/Home';
import Configuracoes from '../pages/Usuario/Configuracoes';

import NovaReclamacao from '../pages/Reclamacoes/Nova';

import NovaPeticao from '../pages/Peticoes/Nova';


const Stack = createStackNavigator();

export default function Routes() {
  const { colorScheme } = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#0A62AC');
      StatusBar.setBarStyle('light-content');
    } else if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#0A62AC');
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

        <Stack.Screen
          name="Configurações"
          component={Configuracoes}
        />
        
        <Stack.Screen
          name="NovaReclamacao"
          component={NovaReclamacao}
        />
        <Stack.Screen
          name="NovaPeticao"
          component={NovaPeticao}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
