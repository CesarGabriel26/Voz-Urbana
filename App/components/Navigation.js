import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../utils/ThemeContext'; // Importa o hook de tema
import { StatusBar, Platform, Image, TouchableOpacity } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import CriarReport from '../pages/Reclamações/CriarReport';
import Reportes from '../pages/Reclamações/Reports';
import ReportesDoUsuario from '../pages/Reclamações/SeusReports';

import CriaPeticao from '../pages/Petições/CriarPeticao'
import Peticoes from '../pages/Petições/Peticoes'
import PeticoesDoUsuario from '../pages/Petições/SuasPeticoes';
import VerPeticao from '../pages/Petições/VerPeticao'

import Home from '../pages/Usuario/Home';
import Settings from '../pages/Usuario/Config'
import Login from '../pages/Usuario/Login';
import CadUser from '../pages/Usuario/cadUser';
import Map from '../pages/Usuario/Map';


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
        screenOptions={({ navigation }) => ({
          headerTintColor: colorScheme.Text.textSecondary,
          headerStyle: {
            backgroundColor: colorScheme.Screen.panelBackground,
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
        {/* Telas normais */}
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadUser}
        />
        <Stack.Screen
          name="Home"
          options={{
            headerLeft: ""
          }}
          component={Home}
        />
        <Stack.Screen
          name="Mapa"
          component={Map}
        />
        <Stack.Screen
          name="Configurações"
          component={Settings}
        />

        {/* Reclamações / Reportes */}
        <Stack.Screen
          name="Reclamações"
          component={Reportes}
        />
        <Stack.Screen
          name="Reportar"
          component={CriarReport}

        />
        <Stack.Screen
          name="Suas Reclamações"
          component={ReportesDoUsuario}
        />

        {/* Petições / Abaixo assinados */}
        <Stack.Screen
          name="Petições"
          component={Peticoes}
        />
        <Stack.Screen
          name="Criar Petição"
          component={CriaPeticao}
        />
        <Stack.Screen
          name="Suas Petições"
          component={PeticoesDoUsuario}
        />
        <Stack.Screen
          name="Detalhes Da Petição"
          component={VerPeticao}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
