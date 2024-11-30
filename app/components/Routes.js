import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, Platform, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../pages/Iniciais/Login';
import SingUp from '../pages/Iniciais/SingUp';

import Home from '../pages/Usuario/Home';
import Configuracoes from '../pages/Usuario/Configuracoes';

import NovaReclamacao from '../pages/Reclamacoes/Nova';

import NovaPeticao from '../pages/Peticoes/Nova';
import Avatar from './UserAvatar';
import decodeUserToken from '../utils/JWT';
import Mapa from '../pages/Extra/Map';
import Lista from '../pages/Peticoes/Lista';
import Detalhes from '../pages/Peticoes/Detalhes';

import ListaReclamacao from '../pages/Reclamacoes/Lista';
import EscalaDePrioridade from '../pages/Extra/EscalaDePrioridade';
import VerReclamacao from '../pages/Reclamacoes/Detalhes';


const Stack = createStackNavigator();

export default function Routes() {
  const { colorScheme } = useTheme();
  const [userData, setUserData] = useState();

  const initializeUser = async () => {
    try {
      const token = await AsyncStorage.getItem('usuario');
      if (token) {
        const user = decodeUserToken(token) || {};
        setUserData(user)
      } else {
        console.log('No token found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // initializeUser()

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#0A62AC');
      StatusBar.setBarStyle('dark-content');
    } else if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('light-content');
    }
  }, []);


  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerTintColor: colorScheme.Text.headerTittle,
          headerStyle: {
            backgroundColor: colorScheme.Header_bg,
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
              {
                userData ? (
                  <Avatar
                    uri={userData.pfp ? userData.pfp : null}
                    text={userData.name || "?"}
                    size={40}
                    shape="square"
                  />
                ) : null
              }

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
          initialParams={{
            initializeUser: initializeUser
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
          name="Mapa"
          component={Mapa}
        />

        <Stack.Screen
          name="Escala de Prioridades"
          component={EscalaDePrioridade}
        />


        <Stack.Screen
          name="Nova Reclamaçao"
          component={NovaReclamacao}
        />
        <Stack.Screen
          name="Reclamações"
          component={ListaReclamacao}
        />
        <Stack.Screen
          name="Detalhes Da Reclamação"
          component={VerReclamacao}
        />


        <Stack.Screen
          name="Nova Petiçao"
          component={NovaPeticao}
        />
        <Stack.Screen
          name="Petições"
          component={Lista}
        />
        <Stack.Screen
          name="Detalhes Da Petição"
          component={Detalhes}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
