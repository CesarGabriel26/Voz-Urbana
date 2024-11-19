import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';

import { getUserLocation } from '../../utils/permissions/LocationPermtion';
import CustomMapProvider from '../../components/CustomMap';

import { useTheme } from '../../utils/ThemeContext';
import MainContainer from '../../components/MainContainer'
import { InputStyles } from '../../styles/Inputs';
import { ButtonsStyles } from '../../styles/Buttons';

export default function NovaPeticao({ navigation }) {
    const [complaints, setComplaints] = useState([]);
    const [location, setLocation] = useState(null);

    const { colorScheme } = useTheme();

    const getLocation = async () => {
        try {
            let loc = await getUserLocation();
            setLocation(loc);
        } catch (error) {
            console.error("Erro ao obter localização:", error);
        }
    };

    const loadList = async () => {
        let resp = await listReports()
        if (resp.content) {
            setComplaints(resp.content)
        }
    }

    useEffect(() => {
        loadList()
        getLocation();
    }, []);

    return (
        <MainContainer>
            <View>
                <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20}}>
                    Causa/Petição
                </Text>
                <TextInput
                    placeholder=''
                    style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />

                <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                    Local
                </Text>
                <TextInput
                    placeholder=''
                    style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />
                <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                    Assinaturas
                </Text>
                <TextInput
                    placeholder=''
                    style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />

                <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                    Explique o motivo detalhadamente
                </Text>
                <TextInput
                    placeholder=''
                    style={[InputStyles.inputTall, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={[ButtonsStyles.default, colorScheme.Buttons.Primary, { marginVertical: 15, width: '45%' }]}
                    >
                        <Text style={{ color: 'white' }}> Enviar </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[ButtonsStyles.default, colorScheme.Buttons.Secondary, { marginVertical: 15, width: '45%' }]}
                    >
                        <Text style={{ color: 'black' }}> Verificar endereço </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </MainContainer>
    );
}

const styles = StyleSheet.create({

});
